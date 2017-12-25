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
import { Panel } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { ITableResponse, IListResponse } from 'lib/api';

import Routing from 'components/Routing';
import DocumentTitle from 'components/DocumentTitle';
import Heading from 'components/Heading';
import Money from 'components/Money';

export interface IColumnDisplayRule {
    disabled?: boolean;
    render: (value: string) => JSX.Element;
}

export const columnDisplayRules: { [key: string]: IColumnDisplayRule } = {
    money: {
        render: data => (<Money value={data} />)
    },
    varchar: {
        render: data => (<span>{data}</span>)
    },
    text: {
        render: data => (<span>{data}</span>)
    },
    jsonb: {
        render: data => (<span>{data}</span>)
    },
    double: {
        render: data => (<span>{data}</span>)
    },
    character: {
        render: data => (<span>{data}</span>)
    },
    number: {
        render: data => (<span>{data}</span>)
    },
    bytea: {
        disabled: true,
        render: () => (<span className="text-muted">[BLOB]</span>)
    }
};

export interface IViewProps {
    vde?: boolean;
    tableName: string;
    table: ITableResponse;
    tableData: IListResponse;
}

const View: React.SFC<IViewProps> = (props) => (
    <DocumentTitle title={props.tableName}>
        <div>
            <Heading>
                <FormattedMessage id="admin.tables" defaultMessage="Tables" />
            </Heading>
            <div className="content-wrapper">
                <ol className="breadcrumb">
                    <li>
                        <Routing.SystemLink page={props.vde ? '/vde/tables' : '/admin/tables'}>
                            <FormattedMessage id="admin.tables" defaultMessage="Tables" />
                        </Routing.SystemLink>
                    </li>
                    <li>
                        {props.tableName}
                    </li>
                </ol>
                <Panel bsStyle="default">
                    <div className="table-responsive">
                        {(props.table && props.tableData) && (
                            <table className="table table-striped table-bordered table-hover ui-responsive ui-table ui-table-reflow">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        {props.table.columns.map(col => (
                                            <th key={col.name}>{col.name}</th>
                                        ))}
                                        {!props.vde && (
                                            <th style={{ width: 1 }}>
                                                <FormattedMessage id="admin.tables.changes" defaultMessage="Changes" />
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.table && props.tableData.list && props.tableData.list.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)).map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.id}</td>
                                            {props.table.columns.map(col => (
                                                <td key={col.name}>
                                                    {columnDisplayRules[col.type] && columnDisplayRules[col.type].render(row[col.name])}
                                                </td>
                                            ))}
                                            {!props.vde && (
                                                <td>
                                                    {'0' === row.rb_id ?
                                                        (
                                                            <span className="text-muted">
                                                                <FormattedMessage id="admin.tables.unchanged" defaultMessage="Unchanged" />
                                                            </span>
                                                        ) : (
                                                            <Routing.SystemLink className="btn btn-primary" page={`/admin/tables/${props.table.name}/${row.id}/history`}>
                                                                <FormattedMessage id="admin.tables.history" defaultMessage="History" />
                                                            </Routing.SystemLink>
                                                        )
                                                    }
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </Panel>
            </div>
        </div>
    </DocumentTitle>
);

export default View;