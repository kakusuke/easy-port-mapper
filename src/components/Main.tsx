import React from 'react';
import { useRecoilValue } from "recoil";
import { groupsState } from "../states/groupsState";
import ImportComposeButton from "./ImportComposeButton";
import RemoteAddrInput from "./RemoteAddrInput";
import PortForwardingButton from "./PortForwardingButton";
import ServiceNameInput from "./ServiceNameInput";
import GroupNameInput from "./GroupNameInput";
import AddGroupButton from "./AddGroupButton";
import LocalPortInput from "./LocalPortInput";
import RemotePortInput from "./RemotePortInput";
import PortMappingDeleteButton from "./PortMappingDeleteButton";
import PortMappingAddButton from "./PortMappingAddButton";
import ItemDeleteButton from "./ItemDeleteButton";
import ItemAddButton from "./ItemAddButton";
import DeleteGroupButton from "./DeleteGroupButton";
import styles from './Main.module.css';

export default () => {
    const groups = useRecoilValue(groupsState);
    return (<div>
        <dl>
            {groups.map(group =>
                <React.Fragment key={group.id}>
                    <dt><GroupNameInput group={group}/><DeleteGroupButton group={group}/></dt>
                    <dd>
                        <table>
                            <thead>
                            <tr>
                                <th>status</th>
                                <th>service name</th>
                                <th>host name</th>
                                <th>port mappings</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {group.list.map(item =>
                                <tr key={item.id}>
                                    <td><PortForwardingButton item={item}/></td>
                                    <td><ServiceNameInput item={item}/></td>
                                    <td><RemoteAddrInput item={item}/></td>
                                    <td>
                                        <ul className={styles.portMappingGroup}>
                                            {item.ports.map(port =>
                                                <li key={port.id} className={styles.portMapping}>
                                                    <span>local:<LocalPortInput port={port}/></span>
                                                    <span
                                                        className={styles.portMappingSeparator}> → </span>
                                                    <span>{item.remoteAddr}:<RemotePortInput
                                                        port={port}/></span>
                                                    <span
                                                        className={styles.portMappingDelete}><PortMappingDeleteButton
                                                        item={item} port={port}/></span>
                                                </li>
                                            )}
                                            <li><PortMappingAddButton item={item}/></li>
                                        </ul>
                                    </td>
                                    <td><ItemDeleteButton group={group} item={item}/></td>
                                </tr>
                            )}
                            </tbody>
                            <tfoot>
                            <tr>
                                <th colSpan={5}><ItemAddButton group={group}/></th>
                            </tr>
                            </tfoot>
                        </table>
                    </dd>
                </React.Fragment>
            )}
        </dl>
        <AddGroupButton/>
        <ImportComposeButton/>
    </div>);
}