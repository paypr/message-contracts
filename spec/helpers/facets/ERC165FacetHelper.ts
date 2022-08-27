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

import {
  ERC165Facet__factory,
  ERC165Init__factory,
  IERC165__factory,
} from '@paypr/ethereum-contracts/dist/types/contracts';
import { Contract } from 'ethers';
import { INITIALIZER } from '../Accounts';

export const asErc165 = (contract: Contract) => IERC165__factory.connect(contract.address, INITIALIZER);

export const deployErc165Facet = () => new ERC165Facet__factory(INITIALIZER).deploy();
export const deployErc165Init = () => new ERC165Init__factory(INITIALIZER).deploy();
