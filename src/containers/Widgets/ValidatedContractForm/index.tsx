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
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { IRootState } from 'modules';
import { contractExec } from 'modules/tx/actions';
import * as uuid from 'uuid';

import Validation from 'components/Validation';

interface IValidatedContractFormProps {
    contractName: string;
    mapContractParams: (values: { [key: string]: any }) => { values: { [key: string]: any } };
    onExec?: (block: string, error: string) => void;
}

interface IValidatedContractFormStateProps {
    transactions: Map<string, { block: string, error: string }>;
}

interface IValidatedContractFormDispatchProps {
    contractExec: typeof contractExec.started;
}

class ValidatedContractForm extends React.Component<IValidatedContractFormProps & IValidatedContractFormStateProps & IValidatedContractFormDispatchProps> {
    private _uuid: string;
    private _pending: boolean;

    componentDidMount() {
        this._uuid = uuid.v4();
    }

    componentWillReceiveProps(props: IValidatedContractFormProps & IValidatedContractFormStateProps & IValidatedContractFormDispatchProps) {
        const transaction = props.transactions.get(this._uuid);
        if (this._pending && this.props.onExec && transaction && (transaction.block || transaction.error)) {
            this._pending = false;
            this.props.onExec(transaction.block, transaction.error);
        }
    }

    onSubmit(values: { [key: string]: any }) {
        const params = this.props.mapContractParams(values);
        this._pending = true;
        this.props.contractExec({
            uuid: this._uuid,
            name: this.props.contractName,
            params
        });
    }

    render() {
        const transaction = this.props.transactions.get(this._uuid);
        const pending = transaction && !transaction.block && !transaction.error;

        return (
            <Validation.components.ValidatedForm onSubmitSuccess={this.onSubmit.bind(this)} pending={pending}>
                {this.props.children}
            </Validation.components.ValidatedForm>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    transactions: state.tx.transactions
});

const mapDispatchToProps = {
    contractExec: contractExec.started
};

export default connect<IValidatedContractFormStateProps, IValidatedContractFormDispatchProps, void>(mapStateToProps, mapDispatchToProps)(ValidatedContractForm);