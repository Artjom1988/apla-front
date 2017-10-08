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
import MonacoEditor from 'react-monaco-editor';

import Validation from 'components/Validation';

interface IMenuEditorProps {
    pending: boolean;
    template: string;
    conditions: string;
    menu?: { id: string, name: string, conditions: string, value: string };
    onSubmit: (values: { [key: string]: any }) => void;
    onSourceEdit: (code: string) => void;
    onConditionsEdit: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const MenuEditor: React.SFC<IMenuEditorProps> = (props) => (
    <Row>
        <Col md={12}>
            <Validation.components.ValidatedForm onSubmitSuccess={props.onSubmit}>
                <Panel
                    bsStyle="primary"
                    header={<FormattedMessage id="admin.interface.menu" defaultMessage="Menu" />}
                    footer={(
                        <div className="text-right">
                            <Button bsStyle="primary" type="submit" disabled={props.pending}>
                                <FormattedMessage id="admin.save" defaultMessage="Save" />
                            </Button>
                        </div>
                    )}
                >
                    <Validation.components.ValidatedFormGroup for="name">
                        <label htmlFor="name">
                            <FormattedMessage id="admin.interface.menu.name" defaultMessage="Name" />
                        </label>
                        {props.menu ?
                            (
                                <Validation.components.ValidatedControl key="nameEdit" name="name" readOnly value={props.menu.name} />
                            ) : (
                                <Validation.components.ValidatedControl key="nameCreate" name="name" validators={[Validation.validators.required]} />
                            )
                        }
                    </Validation.components.ValidatedFormGroup>
                    <Validation.components.ValidatedFormGroup for="content">
                        <label htmlFor="content">
                            <FormattedMessage id="admin.interface.menu.content" defaultMessage="Content" />
                        </label>
                        <div className="form-control" style={{ height: 'auto', padding: 0 }}>
                            <MonacoEditor
                                height={400}
                                language="protypo"
                                value={props.template}
                                onChange={props.onSourceEdit}
                                options={{
                                    automaticLayout: true,
                                    contextmenu: false,
                                    scrollBeyondLastLine: false
                                }}
                            />
                        </div>
                    </Validation.components.ValidatedFormGroup>
                    <Validation.components.ValidatedFormGroup for="conditions" className="mb0">
                        <label htmlFor="conditions">
                            <FormattedMessage id="admin.conditions.change" defaultMessage="Change conditions" />
                        </label>
                        <Validation.components.ValidatedTextarea name="conditions" onChange={props.onConditionsEdit} value={props.conditions} validators={[Validation.validators.required]} />
                    </Validation.components.ValidatedFormGroup>
                </Panel>
            </Validation.components.ValidatedForm>
        </Col>
    </Row>
);

export default MenuEditor;