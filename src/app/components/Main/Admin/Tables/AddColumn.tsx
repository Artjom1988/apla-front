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
import { Col, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { columnTypes } from './Create';

import Routing from 'components/Routing';
import DocumentTitle from 'components/DocumentTitle';
import Heading from 'components/Heading';
import ValidatedContractForm from 'containers/Widgets/ValidatedContractForm';
import Validation from 'components/Validation';

export interface IAddColumnProps {
    vde?: boolean;
    table: string;
}

interface IAddColumnState {
    type: string;
    index: boolean;
}

class AddColumn extends React.Component<IAddColumnProps, IAddColumnState> {
    constructor(props: IAddColumnProps) {
        super(props);
        this.state = {
            type: columnTypes[0].name,
            index: false
        };
    }

    mapContractParams(values: { [key: string]: any }) {
        return {
            TableName: this.props.table,
            Name: values.name,
            Type: this.state.type,
            Permissions: values.permissions
        };
    }

    onIndexChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            index: e.target.checked
        });
    }

    onTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            type: e.target.value,
            index: this.isIndexDenied(e.target.value) ? false : this.state.index
        });
    }

    isIndexDenied(type?: string) {
        return !!columnTypes.find(l => l.name === (type || this.state.type) && l.denyIndex);
    }

    render() {
        return (
            <DocumentTitle title="admin.tables.column.add" defaultTitle="Add column">
                <div>
                    <Heading>
                        <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                    </Heading>
                    <div className="content-wrapper" >
                        <ol className="breadcrumb">
                            <li>
                                <Routing.SystemLink page={this.props.vde ? '/vde/tables' : '/admin/tables'}>
                                    <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                                </Routing.SystemLink>
                            </li>
                            <li>
                                <Routing.SystemLink page={`/${this.props.vde ? 'vde' : 'admin'}/tables/${this.props.table}`}>
                                    {this.props.table}
                                </Routing.SystemLink>
                            </li>
                            <li>
                                <Routing.SystemLink page={`/${this.props.vde ? 'vde' : 'admin'}/tables/${this.props.table}/edit`}>
                                    <FormattedMessage id="admin.tables.edit" defaultMessage="Edit" />
                                </Routing.SystemLink>
                            </li>
                            <li>
                                <FormattedMessage id="admin.tables.column.add" defaultMessage="Add column" />
                            </li>
                        </ol>
                        <ValidatedContractForm vde={this.props.vde} contractName="@1NewColumn" mapContractParams={this.mapContractParams.bind(this)}>
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <Validation.components.ValidatedFormGroup for="name">
                                        <label htmlFor="name">
                                            <FormattedMessage id="admin.tables.column" defaultMessage="Column" />
                                        </label>
                                        <Validation.components.ValidatedControl type="text" name="name" validators={[Validation.validators.required]} />
                                    </Validation.components.ValidatedFormGroup>
                                    <Row>
                                        <Col md={11}>
                                            <Validation.components.ValidatedFormGroup for="type">
                                                <label htmlFor="type">
                                                    <FormattedMessage id="admin.tables.column.type" defaultMessage="Type" />
                                                </label>
                                                <Validation.components.ValidatedSelect name="type" onChange={this.onTypeChange.bind(this)} value={this.state.type}>
                                                    {columnTypes.map(type => (
                                                        <option key={type.name} value={type.name}>
                                                            {type.title}
                                                        </option>
                                                    ))}
                                                </Validation.components.ValidatedSelect>
                                            </Validation.components.ValidatedFormGroup>
                                        </Col>
                                        <Col md={1}>
                                            <Validation.components.ValidatedFormGroup for="index">
                                                <label htmlFor="index">
                                                    <FormattedMessage id="admin.tables.column.index" defaultMessage="Index" />
                                                </label>
                                                <Validation.components.ValidatedCheckbox
                                                    name="index"
                                                    checked={this.state.index}
                                                    onChange={this.onIndexChange.bind(this)}
                                                    disabled={this.isIndexDenied()}
                                                />
                                            </Validation.components.ValidatedFormGroup>
                                        </Col>
                                    </Row>
                                    <Validation.components.ValidatedFormGroup for="permissions">
                                        <label htmlFor="permissions">
                                            <FormattedMessage id="admin.tables.permissions" defaultMessage="Permissions" />
                                        </label>
                                        <Validation.components.ValidatedTextarea name="permissions" validators={[Validation.validators.required]} />
                                    </Validation.components.ValidatedFormGroup>
                                </div>
                                <div className="panel-footer">
                                    <Validation.components.ValidatedSubmit bsStyle="primary">
                                        <FormattedMessage id="admin.save" defaultMessage="Save" />
                                    </Validation.components.ValidatedSubmit>
                                </div>
                            </div>
                        </ValidatedContractForm>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default AddColumn;