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

// Copyright (c) 2017 <https://github.com/m0a/typescript-fsa-redux-observable>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React from 'react';
// import PropTypes from 'prop-types';
// import styles from './node-content-renderer.scss';

function isDescendant(older: any, younger: any) {
    return (
        !!older.children &&
        typeof older.children !== 'function' &&
        older.children.some(
            (child: any) => child === younger || isDescendant(child, younger)
    )
    );
}

interface IFileThemeNodeContentRendererProps {
    scaffoldBlockPxWidth: any;
    toggleChildrenVisibility: any;
    connectDragPreview: any;
    connectDragSource: any;
    isDragging: any;
    canDrop: any;
    canDrag: any;
    node: any;
    title: any;
    draggedNode: any;
    path: any;
    treeIndex: any;
    isSearchMatch: any;
    isSearchFocus: any;
    icons: any;
    buttons: any;
    className: any;
    style: any;
    didDrop: any;
    lowerSiblingCounts: any;
    listIndex: any;
    swapFrom: any;
    swapLength: any;
    swapDepth: any;
    treeId: any;
    isOver: any;
    parentNode: any;
}

// eslint-disable-next-line react/prefer-stateless-function
class FileThemeNodeContentRenderer extends React.Component<IFileThemeNodeContentRendererProps> {
    render() {
        const {
            scaffoldBlockPxWidth,
            toggleChildrenVisibility = null,
            connectDragPreview,
            connectDragSource,
            isDragging,
            canDrop = false,
            canDrag = false,
            node,
            title = null,
            draggedNode = null,
            path,
            treeIndex,
            isSearchMatch = false,
            isSearchFocus = false,
            icons = [],
            buttons = [],
            className = '',
            style = {},
            didDrop,
            lowerSiblingCounts,
            listIndex,
            swapFrom = null,
            swapLength = null,
            swapDepth = null,
            treeId, // Not needed, but preserved for other renderers
            isOver, // Not needed, but preserved for other renderers
            parentNode = null, // Needed for dndManager
    ...otherProps
    } = this.props;
        const nodeTitle = title || node.title + (node.subtitle ? (' ' + node.subtitle) : '');

        const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
        const isLandingPadActive = !didDrop && isDragging;

        // Construct the scaffold representing the structure of the tree
        const scaffold: any = [];
        lowerSiblingCounts.forEach((lowerSiblingCount: any, i: number) => {
            scaffold.push(
        <div
            key={`pre_${1 + i}`}
            style={{ width: scaffoldBlockPxWidth }}
            className="tree-lineBlock"
        />
    );

        if (treeIndex !== listIndex && i === swapDepth) {
            // This row has been shifted, and is at the depth of
            // the line pointing to the new destination
            let highlightLineClass = '';

            if (listIndex === swapFrom + swapLength - 1) {
                // This block is on the bottom (target) line
                // This block points at the target block (where the row will go when released)
                highlightLineClass = 'tree-highlightBottomLeftCorner';
            } else if (treeIndex === swapFrom) {
                // This block is on the top (source) line
                highlightLineClass = 'tree-highlightTopLeftCorner';
            } else {
                // This block is between the bottom and top
                highlightLineClass = 'tree-highlightLineVertical';
            }

            scaffold.push(
            <div
                key={`highlight_${1 + i}`}
                style={{
                    width: scaffoldBlockPxWidth,
                    left: scaffoldBlockPxWidth * i,
                }}
                className={`tree-absoluteLineBlock ${highlightLineClass}`}
            />
        );
        }
    });

        const nodeContent = (
            <div style={{ height: '100%' }} {...otherProps}>
        {toggleChildrenVisibility &&
        node.children &&
        node.children.length > 0 && (
        <button
            type="button"
            aria-label={node.expanded ? 'Collapse' : 'Expand'}
            className={
                node.expanded ? 'tree-collapseButton' : 'tree-expandButton'
        }
            style={{
            left: (lowerSiblingCounts.length - 0.7) * scaffoldBlockPxWidth,
        }}
            onClick={() =>
            toggleChildrenVisibility({
                node,
                path,
                treeIndex,
            })}
        />
        )}

    <div
        className={
                'tree-rowWrapper' +
            (!canDrag ? ' tree-rowWrapperDragDisabled' : '')
    }
    >
        {/* Set the row preview to be used during drag and drop */}
        {connectDragPreview(
        <div style={{ display: 'flex' }}>
            {scaffold}
        <div
            className={
                    'tree-row' +
                (isLandingPadActive ? ' tree-rowLandingPad' : '') +
                (isLandingPadActive && !canDrop
                    ? ' tree-rowCancelPad'
                    : '') +
                (isSearchMatch ? ' tree-rowSearchMatch' : '') +
                (isSearchFocus ? ' tree-rowSearchFocus' : '') +
                (className ? ` ${className}` : '')
        }
            style={{
            opacity: isDraggedDescendant ? 0.5 : 1,
        ...style,
        }}
        >
        <div
            className={
                    'tree-rowContents' +
                (!canDrag ? ' tree-rowContentsDragDisabled' : '')
        }
        >
        <div className="tree-rowToolbar">
            {icons.map((icon: any, index: number) => (
            <div
                key={index}
                className="tree-toolbarButton"
            >
                {icon}
            </div>
            ))}
        </div>
        <div className="tree-rowLabel">
        <span className="tree-rowTitle">
            {typeof nodeTitle === 'function'
                ? nodeTitle({
                node,
                path,
                treeIndex,
            })
                : nodeTitle}
        </span>
        </div>

        <div className="tree-rowToolbar">
            {buttons.map((btn: any, index: number) => (
            <div
                key={index}
                className="tree-toolbarButton"
            >
                {btn}
            </div>
            ))}
        </div>
        </div>
        </div>
        </div>
        )}
    </div>
        </div>
    );

        return canDrag
            ? connectDragSource(nodeContent, { dropEffect: 'copy' })
            : nodeContent;
    }
}

// FileThemeNodeContentRenderer.defaultProps = {
//     buttons: [],
//     canDrag: false,
//     canDrop: false,
//     className: '',
//     draggedNode: null,
//     icons: [],
//     isSearchFocus: false,
//     isSearchMatch: false,
//     parentNode: null,
//     style: {},
//     swapDepth: null,
//     swapFrom: null,
//     swapLength: null,
//     title: null,
//     toggleChildrenVisibility: null,
// };

// FileThemeNodeContentRenderer.propTypes = {
//     buttons: PropTypes.arrayOf(PropTypes.node),
//     canDrag: PropTypes.bool,
//     className: PropTypes.string,
//     icons: PropTypes.arrayOf(PropTypes.node),
//     isSearchFocus: PropTypes.bool,
//     isSearchMatch: PropTypes.bool,
//     listIndex: PropTypes.number.isRequired,
//     lowerSiblingCounts: PropTypes.arrayOf(PropTypes.number).isRequired,
//     node: PropTypes.shape({}).isRequired,
//     path: PropTypes.arrayOf(
//         PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//     ).isRequired,
//     scaffoldBlockPxWidth: PropTypes.number.isRequired,
//     style: PropTypes.shape({}),
//     swapDepth: PropTypes.number,
//     swapFrom: PropTypes.number,
//     swapLength: PropTypes.number,
//     title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
//     toggleChildrenVisibility: PropTypes.func,
//     treeIndex: PropTypes.number.isRequired,
//     treeId: PropTypes.string.isRequired,
//
//     // Drag and drop API functions
//     // Drag source
//     connectDragPreview: PropTypes.func.isRequired,
//     connectDragSource: PropTypes.func.isRequired,
//     didDrop: PropTypes.bool.isRequired,
//     draggedNode: PropTypes.shape({}),
//     isDragging: PropTypes.bool.isRequired,
//     parentNode: PropTypes.shape({}), // Needed for dndManager
//     // Drop target
//     canDrop: PropTypes.bool,
//     isOver: PropTypes.bool.isRequired,
// };

export default FileThemeNodeContentRenderer;