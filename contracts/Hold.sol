// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title The Hold — Coup Ahoo fee sink and epoch prize
/// @notice LetsCash fee recipient. No EOA in the launch form.
/// @dev Solidity 0.8.24, optimizer 200, EVM cancun. Remix on chain 4663.
contract Hold {
    string public name = "The Hold";
    string public ticker = "AHOO";
    string public description =
        "Dice are your hull. Thirteen sinks you. Take the fleet.";
    string public website = "https://coupahoo.lol";
    string public twitter = "https://x.com/CoupAhoo";
    string public github = "https://github.com/CoupAhoo/coupahoo";

    uint256 public constant PRIZE_BPS = 7000;
    uint256 public constant DRIP_BPS = 2000;
    uint256 public constant CABIN_BPS = 1000;
    uint256 public constant EPOCH = 15 minutes;
    uint256 public constant MAX_PAYOUT_BPS = 8000;
    uint256 public constant CLOSER_BPS = 100;

    address public immutable cabin;

    uint256 public prizeWei;
    uint256 public dripWei;
    uint256 public cabinWei;
    uint256 public totalReceived;

    struct Best {
        address player;
        uint64 score;
        bytes32 runHash;
    }

    mapping(uint256 => Best) public best;
    mapping(uint256 => bool) public settled;
    mapping(address => mapping(uint256 => bool)) public logged;

    event Received(address indexed from, uint256 amount, uint256 prize, uint256 drip, uint256 cabinAmt);
    event RunLogged(uint256 indexed epoch, address indexed player, uint64 score, bytes32 runHash);
    event Settled(uint256 indexed epoch, address indexed winner, uint256 paid, address closer, uint256 tip);
    event CabinWithdraw(address indexed to, uint256 amount);
    event DripSent(address indexed to, uint256 amount);

    error OnlyCabin();
    error AlreadyLogged();
    error AlreadySettled();
    error EpochLive();
    error ZeroCabin();
    error ZeroTo();

    constructor(address cabin_) {
        if (cabin_ == address(0)) revert ZeroCabin();
        cabin = cabin_;
    }

    receive() external payable {
        _split(msg.value);
    }

    fallback() external payable {
        if (msg.value > 0) _split(msg.value);
    }

    function _split(uint256 amount) internal {
        if (amount == 0) return;
        uint256 prize = (amount * PRIZE_BPS) / 10_000;
        uint256 drip = (amount * DRIP_BPS) / 10_000;
        uint256 cab = amount - prize - drip;
        prizeWei += prize;
        dripWei += drip;
        cabinWei += cab;
        totalReceived += amount;
        emit Received(msg.sender, amount, prize, drip, cab);
    }

    function currentEpoch() public view returns (uint256) {
        return block.timestamp / EPOCH;
    }

    function pots()
        external
        view
        returns (uint256 prize, uint256 drip, uint256 cab, uint256 total)
    {
        return (prizeWei, dripWei, cabinWei, totalReceived);
    }

    function logRun(uint64 score, bytes32 runHash) external {
        uint256 e = currentEpoch();
        if (logged[msg.sender][e]) revert AlreadyLogged();
        logged[msg.sender][e] = true;
        Best storage b = best[e];
        if (score > b.score) {
            b.player = msg.sender;
            b.score = score;
            b.runHash = runHash;
        }
        emit RunLogged(e, msg.sender, score, runHash);
    }

    function settle(uint256 epoch) external {
        if (epoch >= currentEpoch()) revert EpochLive();
        if (settled[epoch]) revert AlreadySettled();
        settled[epoch] = true;
        Best memory b = best[epoch];
        uint256 pot = prizeWei;
        if (b.player == address(0) || pot == 0) {
            emit Settled(epoch, address(0), 0, msg.sender, 0);
            return;
        }
        uint256 pay = (pot * MAX_PAYOUT_BPS) / 10_000;
        uint256 tip = (pay * CLOSER_BPS) / 10_000;
        uint256 toWinner = pay - tip;
        prizeWei = pot - pay;
        if (toWinner > 0) {
            (bool ok, ) = payable(b.player).call{value: toWinner}("");
            require(ok, "winner");
        }
        if (tip > 0) {
            (bool ok2, ) = payable(msg.sender).call{value: tip}("");
            require(ok2, "closer");
        }
        emit Settled(epoch, b.player, toWinner, msg.sender, tip);
    }

    function withdrawCabin(address to, uint256 amount) external {
        if (msg.sender != cabin) revert OnlyCabin();
        if (to == address(0)) revert ZeroTo();
        if (amount > cabinWei) amount = cabinWei;
        cabinWei -= amount;
        (bool ok, ) = payable(to).call{value: amount}("");
        require(ok, "cabin");
        emit CabinWithdraw(to, amount);
    }

    /// @notice Cabin forwards accrued drip to a later holder distributor. Not a claim.
    function sendDrip(address to, uint256 amount) external {
        if (msg.sender != cabin) revert OnlyCabin();
        if (to == address(0)) revert ZeroTo();
        if (amount > dripWei) amount = dripWei;
        dripWei -= amount;
        (bool ok, ) = payable(to).call{value: amount}("");
        require(ok, "drip");
        emit DripSent(to, amount);
    }

    function socials()
        external
        view
        returns (string memory, string memory, string memory, string memory, string memory, string memory)
    {
        return (name, ticker, description, website, twitter, github);
    }
}
