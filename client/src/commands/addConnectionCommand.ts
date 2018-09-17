/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/
'use strict';
import {UserInputUtil} from './UserInputUtil';
import { FabricConnectionRegistryEntry } from '../fabric/FabricConnectionRegistryEntry';
import { FabricConnectionRegistry } from '../fabric/FabricConnectionRegistry';

// TODO: make it save where have got up to
export async function addConnection(): Promise<{} | void> {
    console.log('addConnection');
    const connectionName: string = await UserInputUtil.showInputBox('Enter a name for the connection');

    if (!connectionName) {
        return Promise.resolve();
    }

    const connectionProfilePath: string = await UserInputUtil.showInputBox('Enter a file path to the connection profile json file');

    if (!connectionProfilePath) {
        return Promise.resolve();
    }

    const certificatePath: string = await UserInputUtil.showInputBox('Enter a file path to the certificate file');

    if (!certificatePath) {
        return Promise.resolve();
    }

    const privateKeyPath: string = await UserInputUtil.showInputBox('Enter a file path to the private key file');

    if (!privateKeyPath) {
        return Promise.resolve();
    }

    const fabricConnectionEntry = new FabricConnectionRegistryEntry();
    fabricConnectionEntry.connectionProfilePath = connectionProfilePath;
    fabricConnectionEntry.name = connectionName;
    fabricConnectionEntry.identities = [{
        certificatePath,
        privateKeyPath
    }];

    const fabricConnectionRegistry: FabricConnectionRegistry = FabricConnectionRegistry.instance();
    return fabricConnectionRegistry.add(fabricConnectionEntry);
}
