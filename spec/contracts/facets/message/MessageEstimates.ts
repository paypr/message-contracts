import { buildERC721AddHooksInitFunction } from '@paypr/ethereum-contracts/dist/src/contracts/artifacts';
import { buildDiamondFacetCut, emptyDiamondInitFunction } from '@paypr/ethereum-contracts/dist/src/contracts/diamonds';
import { buildMessageContentLimitsInitSetMaxContentLengthFunction } from '../../../../src/contracts/messages/messageContentLimits';
import { buildMessageCostInitSetBasicCostFunction } from '../../../../src/contracts/messages/messageCost';
import { combineDiamondInitFunctions } from '../../../helpers/DiamondHelper';
import { EstimateTest } from '../../../helpers/EstimateHelper';
import { deployERC721Init } from '../../../helpers/facets/ERC721FacetHelper';
import {
  deployBasicMessageCostERC721Hooks,
  deployBasicMessageCostFacet,
  deployMessageContentLimitsERC721Hooks,
  deployMessageContentLimitsFacet,
  deployMessageContentLimitsInit,
  deployMessageCostInit,
  deployMessageFacet,
  deployMessageRepliesFacet,
} from '../../../helpers/facets/MessageFacetHelper';

export const messageEstimateTests: EstimateTest[] = [
  [
    'BasicMessageCostFacet',
    async () => ({
      diamondCuts: [buildDiamondFacetCut(await deployBasicMessageCostFacet())],
      initFunction: emptyDiamondInitFunction,
    }),
    97847,
  ],
  [
    'BasicMessageCostFacet with init',
    async () => ({
      diamondCuts: [buildDiamondFacetCut(await deployBasicMessageCostFacet())],
      initFunction: buildMessageCostInitSetBasicCostFunction(await deployMessageCostInit(), 1),
    }),
    124838,
  ],
  [
    'BasicMessageCostFacet with init and hooks',
    async () => ({
      diamondCuts: [buildDiamondFacetCut(await deployBasicMessageCostFacet())],
      initFunction: await combineDiamondInitFunctions([
        buildMessageCostInitSetBasicCostFunction(await deployMessageCostInit(), 1),
        buildERC721AddHooksInitFunction(await deployERC721Init(), await deployBasicMessageCostERC721Hooks()),
      ]),
    }),
    209600,
  ],
  [
    'MessageFacet',
    async () => ({
      diamondCuts: [buildDiamondFacetCut(await deployMessageFacet())],
      initFunction: emptyDiamondInitFunction,
    }),
    194863,
  ],
  [
    'MessageContentLimitsFacet',
    async () => ({
      diamondCuts: [buildDiamondFacetCut(await deployMessageContentLimitsFacet())],
      initFunction: emptyDiamondInitFunction,
    }),
    97847,
  ],
  [
    'MessageContentLimitsFacet with init',
    async () => ({
      diamondCuts: [buildDiamondFacetCut(await deployMessageContentLimitsFacet())],
      initFunction: buildMessageContentLimitsInitSetMaxContentLengthFunction(await deployMessageContentLimitsInit(), 1),
    }),
    124838,
  ],
  [
    'MessageContentLimitsFacet with init and hooks',
    async () => ({
      diamondCuts: [buildDiamondFacetCut(await deployMessageContentLimitsFacet())],
      initFunction: await combineDiamondInitFunctions([
        buildMessageContentLimitsInitSetMaxContentLengthFunction(await deployMessageContentLimitsInit(), 1),
        buildERC721AddHooksInitFunction(await deployERC721Init(), await deployMessageContentLimitsERC721Hooks()),
      ]),
    }),
    209600,
  ],
  [
    'MessageRepliesFacet',
    async () => ({
      diamondCuts: [buildDiamondFacetCut(await deployMessageRepliesFacet())],
      initFunction: emptyDiamondInitFunction,
    }),
    170609,
  ],
];
