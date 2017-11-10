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
import { injectIntl, InjectedIntlProps } from 'react-intl';
import * as propTypes from 'prop-types';

import ProtypoEditable, { IParamsSpec } from './ProtypoEditable';
import ValidatedForm from 'components/Validation/ValidatedForm';
import TxButton from 'containers/Widgets/TxButton';

export interface IButtonProps {
    'class'?: string;
    'alert'?: {
        icon: string;
        text: string;
        confirmbutton: string;
        cancelbutton: string;
    };
    'contract'?: string;
    'page'?: string;
    'pageparams'?: IParamsSpec;
    'params'?: IParamsSpec;
    'formID'?: number;
}

interface IButtonContext {
    form: ValidatedForm;
    protypo: ProtypoEditable;
}

const Button: React.SFC<IButtonProps & InjectedIntlProps> = (props, context: IButtonContext) => {
    const getParams = () => {
        const params = {};

        return {
            ...params,
            ...context.protypo.resolveParams(props.params)
        };
    };

    const getPageParams = () => {
        return context.protypo.resolveParams(props.pageparams);
    };

    return (
        <TxButton
            className={props.class}
            contractName={props.contract}
            contractParams={getParams}
            page={props.page}
            pageParams={getPageParams}
        >
            {props.children}
        </TxButton>
    );
};

Button.contextTypes = {
    form: propTypes.object,
    protypo: propTypes.object.isRequired
};

export default injectIntl(Button);