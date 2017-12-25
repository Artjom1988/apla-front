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

import actionCreatorFactory from 'typescript-fsa';
import { IProtypoElement } from 'components/Protypo/Protypo';

const actionCreator = actionCreatorFactory('content');

// Navigation
export const setResizing = actionCreator<boolean>('SET_RESIZING');
export const navigationResize = actionCreator<number>('NAVIGATION_RESIZE');
export const navigationToggle = actionCreator('NAVIGATION_TOGGLE');
export const menuPop = actionCreator<{ section: string }>('MENU_POP');
export const menuPush = actionCreator<{ section: string, name: string, vde: boolean, content: IProtypoElement[] }>('MENU_PUSH');
export const alertShow = actionCreator<{ id: string, type: string, title: string, text: string, confirmButton?: string, cancelButton?: string }>('ALERT_SHOW');
export const alertClose = actionCreator<{ id: string, success: string, error: string }>('ALERT_CLOSE');
export const ecosystemInit = actionCreator.async<{ section: string }, { defaultMenu: { name: string, vde: boolean, content: IProtypoElement[] }, stylesheet: string }, string>('ECOSYSTEM_INIT');
export const navigateLast = actionCreator.async<{ section: string }, undefined, undefined>('NAVIGATE_LAST');
export const navigatePage = actionCreator.async<{ section: string, name?: string, params?: { [key: string]: any }, vde?: boolean }, undefined, undefined>('NAVIGATE_PAGE');
export const renderPage = actionCreator.async<{ section: string, name: string, params?: { [key: string]: any }, vde?: boolean }, { menu: { name: string, vde: boolean, content: IProtypoElement[] }, page: { name: string, content: IProtypoElement[], error?: string } }, string>('RENDER_PAGE');
export const reset = actionCreator.async<{ section: string }, { menu: { name: string, vde: boolean, content: IProtypoElement[] }, page: { name: string, content: IProtypoElement[], error?: string } }, string>('RESET');

// Image editor modal window
export const imageEditorOpen = actionCreator<{ mime: string, data: string, width?: number, aspectRatio?: number }>('IMAGE_EDITOR_OPEN');
export const imageEditorClose = actionCreator<string>('IMAGE_EDITOR_CLOSE');

// Notifications
export const fetchNotifications = actionCreator.async<undefined, IProtypoElement[], undefined>('FETCH_NOTIFICATIONS');