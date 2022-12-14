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

import { buildERC721AddHooksInitFunction } from '@paypr/ethereum-contracts/dist/src/contracts/artifacts';
import { buildDiamondFacetCut } from '@paypr/ethereum-contracts/dist/src/contracts/diamonds';
import { BigNumberish, Contract, Signer } from 'ethers';
import { buildMessageContentLimitsInitSetMaxContentLengthFunction } from '../../../src/contracts/messages/messageContentLimits';
import { buildMessageCostInitSetBasicCostFunction } from '../../../src/contracts/messages/messageCost';
import {
  BasicMessageCostERC721Hooks__factory,
  BasicMessageCostFacet__factory,
  IMessage__factory,
  IMessageContentLimits__factory,
  IMessageCost__factory,
  IMessageReplies__factory,
  MessageContentLimitsERC721Hooks__factory,
  MessageContentLimitsFacet__factory,
  MessageContentLimitsInit__factory,
  MessageCostInit__factory,
  MessageFacet__factory,
  MessageRepliesFacet__factory,
} from '../../../types/contracts';
import { INITIALIZER } from '../Accounts';
import { combineExtensibleDiamondOptions, createDiamond, ExtensibleDiamondOptions } from '../DiamondHelper';
import { buildERC721Additions, deployERC721Init } from './ERC721FacetHelper';

export const asMessage = (contract: Contract, signer: Signer = contract.signer) =>
  IMessage__factory.connect(contract.address, signer);

export const asMessageReplies = (contract: Contract, signer: Signer = contract.signer) =>
  IMessageReplies__factory.connect(contract.address, signer);

export const asMessageContentLimits = (contract: Contract, signer: Signer = contract.signer) =>
  IMessageContentLimits__factory.connect(contract.address, signer);

export const asMessageCost = (contract: Contract, signer: Signer = contract.signer) =>
  IMessageCost__factory.connect(contract.address, signer);

export const createMessage = async (options: ExtensibleDiamondOptions = {}) =>
  asMessage(
    await createDiamond(
      combineExtensibleDiamondOptions(
        { additionalCuts: [buildDiamondFacetCut(await deployMessageFacet())] },
        combineExtensibleDiamondOptions(await buildERC721Additions(), options),
      ),
    ),
  );

export const createMessageWithReplies = async (options: ExtensibleDiamondOptions = {}) =>
  createMessage(combineExtensibleDiamondOptions(await buildMessageRepliesAdditions(), options));

export const buildMessageRepliesAdditions = async (): Promise<ExtensibleDiamondOptions> => ({
  additionalCuts: [buildDiamondFacetCut(await deployMessageRepliesFacet())],
});

export const buildMessageCostAdditions = async (cost: BigNumberish): Promise<ExtensibleDiamondOptions> => ({
  additionalCuts: [buildDiamondFacetCut(await deployBasicMessageCostFacet())],
  additionalInits: [
    buildMessageCostInitSetBasicCostFunction(await deployMessageCostInit(), cost),
    buildERC721AddHooksInitFunction(await deployERC721Init(), await deployBasicMessageCostERC721Hooks()),
  ],
});

export const buildMessageContentLimitsAdditions = async (
  maxLength: BigNumberish,
): Promise<ExtensibleDiamondOptions> => ({
  additionalCuts: [buildDiamondFacetCut(await deployMessageContentLimitsFacet())],
  additionalInits: [
    buildMessageContentLimitsInitSetMaxContentLengthFunction(await deployMessageContentLimitsInit(), maxLength),
    buildERC721AddHooksInitFunction(await deployERC721Init(), await deployMessageContentLimitsERC721Hooks()),
  ],
});

export const deployBasicMessageCostFacet = () => new BasicMessageCostFacet__factory(INITIALIZER).deploy();
export const deployBasicMessageCostERC721Hooks = () => new BasicMessageCostERC721Hooks__factory(INITIALIZER).deploy();
export const deployMessageContentLimitsFacet = () => new MessageContentLimitsFacet__factory(INITIALIZER).deploy();
export const deployMessageContentLimitsERC721Hooks = () =>
  new MessageContentLimitsERC721Hooks__factory(INITIALIZER).deploy();
export const deployMessageContentLimitsInit = () => new MessageContentLimitsInit__factory(INITIALIZER).deploy();
export const deployMessageCostInit = () => new MessageCostInit__factory(INITIALIZER).deploy();
export const deployMessageFacet = () => new MessageFacet__factory(INITIALIZER).deploy();
export const deployMessageRepliesFacet = () => new MessageRepliesFacet__factory(INITIALIZER).deploy();
