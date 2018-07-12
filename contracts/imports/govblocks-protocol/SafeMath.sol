pragma solidity ^0.4.24;


/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {
  function mul(uint256 a, uint256 b) internal view returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal view returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  function sub(uint256 a, uint256 b) internal view returns (uint256) {
    assert(b <= a);
    return a - b;
  }

 function sub32(uint32 a, uint32 b) internal view returns (uint32) {
    assert(b <= a);
    return a - b;
  }
  
  function add(uint256 a, uint256 b) internal view returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
  
  function add32(uint32 a, uint32 b) internal view returns (uint32) {
    uint32 c = a + b;
    assert(c >= a);
    return c;
  }

  function mul128(uint128 a, uint128 b) internal view returns (uint128) {
    if (a == 0) {
      return 0;
    }
    uint128 c = a * b;
    require(c / a == b);
    return c;
  }
}