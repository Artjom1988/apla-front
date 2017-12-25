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
import { FormattedMessage } from 'react-intl';

import Routing from 'components/Routing';
import DocumentTitle from 'components/DocumentTitle';
import Heading from 'components/Heading';
import MenuEditor from './MenuEditor';
import MenuOnlyEditor from './MenuOnlyEditor';

export interface IEditMenuProps {
    vde?: boolean;
    tabView?: boolean;
    menu: { id: string, name: string, conditions: string, value: string };
}

interface IEditMenuState {
    template: string;
    conditions: string;
}

class EditMenu extends React.Component<IEditMenuProps, IEditMenuState> {
    constructor(props: IEditMenuProps) {
        super(props);
        this.state = {
            template: props.menu ? props.menu.value : '',
            conditions: props.menu ? props.menu.conditions : ''
        };
    }

    componentWillReceiveProps(props: IEditMenuProps) {
        if (props.menu && this.props.menu !== props.menu) {
            this.setState({
                template: props.menu.value,
                conditions: props.menu.conditions
            });
        }
    }

    mapContractParams(values: { [key: string]: any }) {
        return {
            Id: this.props.menu.id,
            Value: this.state.template,
            Conditions: this.state.conditions
        };
    }

    onSourceEdit(template: string) {
        this.setState({ template });
    }

    onConditionsEdit(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            conditions: e.target.value
        });
    }

    render() {
        if (this.props.tabView) {
            return (
                <MenuOnlyEditor
                    vde={this.props.vde}
                    contractName="@1EditMenu"
                    mapContractParams={this.mapContractParams.bind(this)}
                    template={this.state.template}
                    conditions={this.state.conditions}
                    menu={this.props.menu}
                    onSourceEdit={this.onSourceEdit.bind(this)}
                    onConditionsEdit={this.onConditionsEdit.bind(this)}
                />
            );
        }

        return (
            <DocumentTitle title={this.props.menu && this.props.menu.name}>
                <div>
                    <Heading>
                        <FormattedMessage id="admin.interface" defaultMessage="Interface" />
                    </Heading>
                    <div className="content-wrapper">
                        <ol className="breadcrumb">
                            <li>
                                <Routing.SystemLink page={this.props.vde ? '/vde/interface' : '/admin/interface'}>
                                    <FormattedMessage id="admin.interface" defaultMessage="Interface" />
                                </Routing.SystemLink>
                            </li>
                            <li>
                                <FormattedMessage id="admin.interface.menu" defaultMessage="Menu" />
                            </li>
                            <li>
                                {this.props.menu && this.props.menu.name}
                            </li>
                        </ol>
                        <MenuEditor
                            vde={this.props.vde}
                            contractName="@1EditMenu"
                            mapContractParams={this.mapContractParams.bind(this)}
                            template={this.state.template}
                            conditions={this.state.conditions}
                            menu={this.props.menu}
                            onSourceEdit={this.onSourceEdit.bind(this)}
                            onConditionsEdit={this.onConditionsEdit.bind(this)}
                        />
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default EditMenu;