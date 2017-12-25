// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import * as React from 'react';
import { Button, Col, Panel, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import Routing from 'components/Routing';
import DocumentTitle from 'components/DocumentTitle';
import Heading from 'components/Heading';

export interface IInterfaceProps {
    vde?: boolean;
    pages: { id: string, name: string }[];
    menus: { id: string, name: string }[];
    blocks: { id: string, name: string }[];
}

const Interface: React.SFC<IInterfaceProps> = (props) => (
    <DocumentTitle title="admin.interface" defaultTitle="Interface">
        <div>
            <Heading>
                <FormattedMessage id="admin.interface" defaultMessage="Interface" />
                <div className="pull-right">
                    <Routing.SystemLink page={props.vde ? '/vde/interface/create-page' : '/admin/interface/create-page'} className="ml btn-tool">
                        <em className="icon icon-plus" />
                        <span>
                            <FormattedMessage id="admin.interface.page.create" defaultMessage="Create page" />
                        </span>
                    </Routing.SystemLink>
                    <Routing.SystemLink page={props.vde ? '/vde/interface/create-block' : '/admin/interface/create-block'} className="ml btn-tool">
                        <em className="icon icon-plus" />
                        <span>
                            <FormattedMessage id="admin.interface.block.create" defaultMessage="Create block" />
                        </span>
                    </Routing.SystemLink>
                    <Routing.SystemLink page={props.vde ? '/vde/interface/create-menu' : '/admin/interface/create-menu'} className="ml btn-tool">
                        <em className="icon icon-plus" />
                        <span>
                            <FormattedMessage id="admin.interface.menu.create" defaultMessage="Create menu" />
                        </span>
                    </Routing.SystemLink>
                </div>
            </Heading>
            <div className="content-wrapper">
                <ol className="breadcrumb">
                    <li>
                        <FormattedMessage id="admin.interface" defaultMessage="Interface" />
                    </li>
                </ol>
                <Row>
                    <Col md={8}>
                        <Panel
                            header={<FormattedMessage id="admin.interface.pages" defaultMessage="Pages" />}
                            bsStyle="primary"
                        >
                            {props.pages.length ?
                                (
                                    <table className="table table-striped table-bordered table-hover">
                                        <tbody>
                                            {props.pages.map(page => (
                                                <tr key={page.id}>
                                                    <td>{page.name}</td>
                                                    <td style={{ width: 1 }}>
                                                        <Routing.SystemLink page={`/${props.vde ? 'vde' : 'admin'}/interface/page/${page.id}-${page.name}`}>
                                                            <Button bsStyle="default" className="btn-labeled btn-icon">
                                                                <span className="btn-label">
                                                                    <em className="fa fa-edit" />
                                                                </span>
                                                            </Button>
                                                        </Routing.SystemLink>
                                                        <Routing.SystemLink page={`/${props.vde ? 'vde' : 'admin'}/tabs/interfacePage-${page.id}-${page.name}`}>
                                                            <Button bsStyle="default" className="btn-labeled btn-icon">
                                                                <span className="btn-label">
                                                                    <em className="fa fa-files-o" />
                                                                </span>
                                                            </Button>
                                                        </Routing.SystemLink>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )
                                :
                                (
                                    <span className="text-muted">
                                        <FormattedMessage id="admin.interface.nothingfound" defaultMessage="Nothing found" />
                                    </span>
                                )
                            }
                        </Panel>
                    </Col>
                    <Col md={4}>
                        <Panel
                            header={<FormattedMessage id="admin.interface.menu" defaultMessage="Menu" />}
                            bsStyle="primary"
                        >
                            {props.menus.length ?
                                (
                                    <table className="table table-striped table-bordered table-hover">
                                        <tbody>
                                            {props.menus.map(menu => (
                                                <tr key={menu.id}>
                                                    <td>{menu.name}</td>
                                                    <td style={{ width: 1 }}>
                                                        <Routing.SystemLink page={`/${props.vde ? 'vde' : 'admin'}/interface/menu/${menu.id}-${menu.name}`}>
                                                            <Button bsStyle="default" className="btn-labeled btn-icon">
                                                                <span className="btn-label">
                                                                    <em className="fa fa-edit" />
                                                                </span>
                                                            </Button>
                                                        </Routing.SystemLink>
                                                        <Routing.SystemLink page={`/${props.vde ? 'vde' : 'admin'}/tabs/interfaceMenu-${menu.id}-${menu.name}`}>
                                                            <Button bsStyle="default" className="btn-labeled btn-icon">
                                                                <span className="btn-label">
                                                                    <em className="fa fa-files-o" />
                                                                </span>
                                                            </Button>
                                                        </Routing.SystemLink>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )
                                :
                                (
                                    <span className="text-muted">
                                        <FormattedMessage id="admin.interface.nothingfound" defaultMessage="Nothing found" />
                                    </span>
                                )
                            }
                        </Panel>
                        <Panel
                            header={<FormattedMessage id="admin.interface.blocks" defaultMessage="Blocks" />}
                            bsStyle="primary"
                        >
                            {props.blocks.length ?
                                (
                                    <table className="table table-striped table-bordered table-hover">
                                        <tbody>
                                            {props.blocks.map(block => (
                                                <tr key={block.id}>
                                                    <td>{block.name}</td>
                                                    <td style={{ width: 1 }}>
                                                        <Routing.SystemLink page={`/${props.vde ? 'vde' : 'admin'}/interface/block/${block.id}-${block.name}`}>
                                                            <Button bsStyle="default" className="btn-labeled btn-icon">
                                                                <span className="btn-label">
                                                                    <em className="fa fa-edit" />
                                                                </span>
                                                            </Button>
                                                        </Routing.SystemLink>
                                                        <Routing.SystemLink page={`/${props.vde ? 'vde' : 'admin'}/tabs/interfaceBlock-${block.id}-${block.name}`}>
                                                            <Button bsStyle="default" className="btn-labeled btn-icon">
                                                                <span className="btn-label">
                                                                    <em className="fa fa-files-o" />
                                                                </span>
                                                            </Button>
                                                        </Routing.SystemLink>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )
                                :
                                (
                                    <span className="text-muted">
                                        <FormattedMessage id="admin.interface.nothingfound" defaultMessage="Nothing found" />
                                    </span>
                                )
                            }
                        </Panel>
                    </Col>
                </Row>
            </div>
        </div>
    </DocumentTitle>
);

export default Interface;