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
import { NavLink } from 'react-router-dom';
import * as classnames from 'classnames';
import styled from 'styled-components';
import * as propTypes from 'prop-types';

export interface IMenuItemProps {
    'title'?: string;
    'page'?: string;
    'icon'?: string;
    'params'?: { [key: string]: any };

    // TODO: Stub value
    '_systemPageHook'?: string;
}

export const StyledLinkButton = styled.div`
    &.active {
        > .link-active-decorator {
            opacity: 1;
        }
    }

    > .link-active-decorator {
        opacity: 0;
        background: #1fafe1;
        float: left;
        width: 3px;
        height: 45px;
        transition: opacity .2s ease-in-out;
    }

    > a {
        display: block;
        height: 45px;
        line-height: 45px;
        padding: 0 14px;
        color: #6c6c6c;
        text-decoration: none;
    }

    .link-body {
        display: block;
        margin: 0 5px;
        border-bottom: solid 1px #e5e5e5;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        .icon {
            margin-right: 14px;
        }
    }
`;

// TODO: Missing page params
const LinkButton: React.SFC<IMenuItemProps> = (props, context) => {
    const isActive = context.router.route.location.pathname === `/page/${props.page}` || (context.router.route.location.pathname) === props._systemPageHook;
    const classes = classnames({
        active: isActive
    });

    const linkBody = (
        <div className="link-body">
            {props.icon && (<em className={`icon ${props.icon}`} />)}
            <span>{props.title}</span>
        </div>
    );

    return (
        <StyledLinkButton className={classes}>
            <div className="link-active-decorator" />
            {props._systemPageHook || props.page ?
                (
                    <NavLink to={props._systemPageHook ? props._systemPageHook : (props.page ? `/page/${props.page}` : '')}>
                        {linkBody}
                    </NavLink>
                ) : (
                    <a href="#">
                        {linkBody}
                    </a>
                )}
        </StyledLinkButton>
    );
};

LinkButton.contextTypes = {
    router: propTypes.object.isRequired
};

export default LinkButton;