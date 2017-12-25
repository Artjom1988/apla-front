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
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DocumentTitle from 'components/DocumentTitle';
import Heading from 'components/Heading';

type TMixedContent =
    JSX.Element | string;

export interface IWrapperProps {
    type: 'default' | 'fullscreen' | 'noscroll';
    title: { title: string, defaultTitle: string };
    heading: {
        content: TMixedContent;
        toolButtons?: {
            url: string;
            icon: string;
            title: TMixedContent;
        }[];
    };
    description?: React.ReactNode;
    breadcrumbs?: TMixedContent[];
}

const StyledDescription = styled.div`
    padding: 10px 20px;
    color: #84909e;
    border-bottom: 1px solid #cfdbe2;
`;

const StyledBreadcrumbs = styled.ul`
    padding: 10px 20px;
    color: #84909e;
    border-bottom: 1px solid #cfdbe2;
    list-style: none;
`;

const bodyClasses = {
    default: 'content-wrapper',
    fullscreen: 'fullscreen',
    noscroll: 'fullscreen-wrapper'
};

const Wrapper: React.SFC<IWrapperProps> = props => (
    <DocumentTitle title={props.title.title} defaultTitle={props.title.defaultTitle}>
        <div className="fullscreen animated fadeIn">
            <Heading>
                <div className="pull-right">
                    {props.heading.toolButtons && props.heading.toolButtons.map((button, index) => (
                        <Link key={index} to={button.url} className="ml btn-tool">
                            <em className={`icon ${button.icon}`} />
                            <span>{button.title}</span>
                        </Link>
                    ))}
                </div>
                <div>{props.heading.content}</div>
            </Heading>

            {props.description && (
                <StyledDescription>
                    {props.description}
                </StyledDescription>
            )}

            {props.breadcrumbs && (
                <StyledBreadcrumbs className="breadcrumb">
                    {props.breadcrumbs.map((breadcrumb, index) => (
                        <li key={index}>
                            {breadcrumb}
                        </li>
                    ))}
                </StyledBreadcrumbs>
            )}

            <div className={bodyClasses[props.type || 'default']}>
                {props.children}
            </div>
        </div>
    </DocumentTitle>
);

export default Wrapper;