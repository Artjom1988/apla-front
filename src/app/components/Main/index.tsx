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
import ReduxToastr from 'react-redux-toastr';
import LoadingBar from 'react-redux-loading-bar';
import { Iterable } from 'immutable';
import styled from 'styled-components';
import platform from 'lib/platform';

import Titlebar from './Titlebar';
import Routing from 'containers/Routing';
import UserMenu from 'containers/Widgets/UserMenu';
import Navigation from 'containers/Main/Navigation';

export const styles = {
    headerHeight: platform.select({ desktop: 28, web: 0 }),
    menuHeight: 40,
    toolbarHeight: 40,
    mainColor: '#4c7dbd'
};

const StyledWrapper = styled.div`
    background-color: #f6f8fa;
`;

export interface IMainProps {
    section: string;
    sections: {
        name: string;
        title: string;
    }[];
    isEcosystemOwner: boolean;
    pending: boolean;
    stylesheet: string;
    navigationWidth: number;
    navigationVisible: boolean;
    pendingTransactions: Iterable<string, { uuid: string, block: string, error: string, contract: string }>;
    transactionsCount: number;
}

const StyledControls = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10000;
`;

const StyledTitlebar = styled.div`
    background: ${styles.mainColor};
    height: ${styles.headerHeight}px;
    line-height: ${styles.headerHeight}px;
    font-size: 15px;
    color: #fff;
    text-align: center;
`;

const StyledMenu = styled.ul`
    background: ${styles.mainColor};
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: ${styles.menuHeight}px;
    position: relative;

    > li {
        margin-top: 6px;
        height: 34px;
        line-height: 34px;
        display: inline-block;
        font-size: 16px;
        color: #fff;
        -webkit-app-region: no-drag;
        user-select: none;

        &.user-menu {
            margin-top: 0;
            height: ${styles.menuHeight}px;
            line-height: normal;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
        }

        button {
            border-radius: 0;
            padding: 0 20px;
            margin: 0;
            outline: 0;
            border: 0;
            background: 0;
            color: #fff;
            font-size: 16px;
            font-weight: 300;
            transition: background .15s;

            &:hover {
                background: rgba(0,0,0,0.1);
            }
        }

        &.active {
            button {
                background: #eeeeee;
                color: #000;
            }
        }
    }
`;

const StyledContent = styled.section`
    margin-top: ${styles.headerHeight + styles.menuHeight + styles.toolbarHeight}px !important;
    transition: none !important;
`;

const StyledLoadingBar = styled(LoadingBar) `
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
`;

const MenuItem: React.SFC<{ section?: string, active?: boolean, onClick?: () => void }> = props => (
    <li className={props.active ? 'active' : ''}>
        {props.section ?
            (
                <Routing.SectionLink section={props.section}>
                    <button onClick={props.onClick}>
                        {props.children}
                    </button>
                </Routing.SectionLink>

            ) :
            (
                <button onClick={props.onClick}>
                    {props.children}
                </button>
            )
        }
    </li>
);

const StyledToolbar = styled.ul`
    background: #eeeeee;
    height: ${styles.toolbarHeight}px;
    border-bottom: solid 2px #e5e5e5;
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-size: 0;

    > li {
        display: inline-block;
        vertical-align: top;

        &.separator {
            width: 2px;
            height: 40px;
            background: #e5e5e5;
        }

        > button {
            text-align: center;
            border-radius: 0;
            min-width: 40px;
            height: 40px;
            outline: 0;
            border: 0;
            background: 0;
            margin: 0;
            padding: 0;
            color: #7e7e7e;
            font-size: 14px;
            font-weight: 300;
            line-height: 40px;
            transition: background .15s;

            > span {
                margin-left: 10px;
            }

            &:hover {
                background: rgba(0,0,0,0.03);
            }
        }
    }
`;

const ToolButton: React.SFC<{ icon: string }> = props => (
    <li>
        <button>
            <em className={`icon ${props.icon}`} />
            {props.children && (<span>{props.children}</span>)}
        </button>
    </li>
);

/*const ToolSeparator: React.SFC = props => (
    <li className="separator">
        <div />
    </li>
);*/

class Main extends React.Component<IMainProps> {
    componentWillMount() {
        platform.on('desktop', () => {
            const { remote } = require('electron');
            const window = remote.getCurrentWindow();
            window.setResizable(true);
            window.setSize(800, 600);
            window.setMinimumSize(800, 600);
            window.center();
        });
    }

    render() {
        return (
            <StyledWrapper className="wrapper component-main">
                <style type="text/css">
                    {this.props.stylesheet}
                </style>
                <StyledControls>
                    <StyledTitlebar className="drag">
                        <Titlebar>Apla</Titlebar>
                    </StyledTitlebar>
                    <StyledMenu className="drag">
                        <MenuItem>
                            <em className="icon-grid" />
                        </MenuItem>
                        {this.props.sections.map(section => (
                            <MenuItem
                                key={section.name}
                                section={section.name}
                                active={section.name === this.props.section}
                            >
                                {section.title}
                            </MenuItem>
                        ))}
                        <li className="user-menu">
                            <UserMenu />
                        </li>
                    </StyledMenu>
                    <StyledToolbar>
                        <ToolButton icon="icon-arrow-left" />
                        <ToolButton icon="icon-arrow-right" />
                        <ToolButton icon="icon-refresh" />
                        <ToolButton icon="icon-home" />
                    </StyledToolbar>
                    <StyledLoadingBar
                        showFastActions
                        style={{
                            backgroundColor: '#c6d2da',
                            width: 'auto',
                            height: 2
                        }}
                    />
                </StyledControls>
                <Navigation section={this.props.section} topOffset={styles.headerHeight + styles.menuHeight + styles.toolbarHeight} />
                <StyledContent style={{ marginLeft: this.props.navigationVisible ? this.props.navigationWidth : 0 }}>
                    <ReduxToastr
                        timeOut={3000}
                        newestOnTop
                        position="top-center"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                    />
                    {this.props.children}
                </StyledContent>
            </StyledWrapper>
        );
    }
}

export default Main;