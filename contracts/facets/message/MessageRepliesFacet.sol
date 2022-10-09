/*
 * Copyright (c) 2022 The Paypr Company, LLC
 *
 * This file is part of Paypr Contracts.
 *
 * Paypr Contracts is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Paypr Contracts is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Paypr Contracts.  If not, see <https://www.gnu.org/licenses/>.
 */

// SPDX-License-Identifier: GPL-3.0-only

pragma solidity ^0.8.9;

import './IMessageReplies.sol';
import './MessageImpl.sol';

contract MessageRepliesFacet is IMessageReplies {
  function replyCount(uint256 id) external view returns (uint256) {
    return MessageImpl.replyCount(id);
  }

  function replyByIndex(uint256 id, uint256 index) external view returns (uint256) {
    return MessageImpl.replyByIndex(id, index);
  }

  function repostCount(uint256 id) external view returns (uint256) {
    return MessageImpl.repostCount(id);
  }

  function repostByIndex(uint256 id, uint256 index) external view returns (uint256) {
    return MessageImpl.repostByIndex(id, index);
  }
}
