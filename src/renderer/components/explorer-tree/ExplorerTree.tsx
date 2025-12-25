import { Paper } from '@mui/material';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { FcFolder } from 'react-icons/fc';
import React, { Fragment, useEffect, useState } from 'react';
import PushPinIcon from '@mui/icons-material/PushPin';
import { appRoutes, getRouteByPath } from '@renderer/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useExplorerTreeStore } from '@renderer/components/explorer-tree/store';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorageState } from '@toolpad/core';

const RenderTreeItems = ({ node, handlePinItem, expandedItems, isPinnedContainer }) => {
  const isExpanded = expandedItems?.includes(node.fullPath);
  const handleTogglePin = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handlePinItem(node);
  };

  return (
    <TreeItem
      key={node.fullPath}
      itemId={node.fullPath}
      disabled={node.disabled}
      classes={{
        content: `!p-0 !pl-2 ${node.disabled ? '!cursor-not-allowed' : ''} ${
          node.hasDivider && !isExpanded && !isPinnedContainer ? 'border-b border-blue-200' : ''
        }`,
        label: 'pl-2 py-1',
      }}
      label={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            cursor: 'pointer',
          }}
          className={`${node.disabled ? 'pointer-events-none' : 'group'}`}
        >
          <span
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            {node.icon ? (
              React.cloneElement(node.icon, {
                className: 'mr-1',
                fontSize: 'large',
                style: {
                  flexShrink: 0,
                },
              })
            ) : (
              <FcFolder
                className="mr-1"
                style={{
                  fontSize: 'large',
                  flexShrink: 0,
                }}
              />
            )}
            <span
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'inline-block',
              }}
            >
              {node.label}
            </span>
          </span>
          {!node.disabledPin && (
            <span
              className={
                !node.pinned ? 'hidden group-hover:inline-block pr-2' : 'inline-block pr-2'
              }
              onClick={handleTogglePin}
              onMouseDown={(e) => e.preventDefault()}
            >
              <PushPinIcon
                sx={{
                  ml: 1,
                  opacity: node.group === 'pinned' ? 1 : 0.4,
                  color: node.group === 'pinned' ? 'rgb(160 161 173)' : '#9ca3af',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                  transform: 'rotate(45deg)',
                  fontSize: '14px',
                  '&:hover': {
                    color: node.group === 'pinned' ? '#6b7280' : '#4b5563',
                    opacity: 1,
                  },
                }}
              />
            </span>
          )}
        </div>
      }
    >
      {node.children?.map((node, index) => (
        <RenderTreeItems
          key={index}
          node={node}
          handlePinItem={handlePinItem}
          expandedItems={expandedItems}
          isPinnedContainer={isPinnedContainer}
        ></RenderTreeItems>
      ))}
      {isExpanded && node.children && node.children.length == 0 && (
        <div className="border-b border-blue-200" />
      )}
    </TreeItem>
  );
};

export const ExplorerTree = () => {
  const store = useExplorerTreeStore();
  const { setHomeItems, setOtherItems, setPinItems } = store;
  const sections = [
    { group: 'home', items: store.home },
    { group: 'pinned', items: store.pinned },
    { group: 'others', items: store.others },
  ];
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [pinned, setPinned] = useLocalStorageState('pinned-items', [], {
    codec: {
      parse: (v) => {
        try {
          return JSON.parse(v);
        } catch {
          return [];
        }
      },
      stringify: (v) => JSON.stringify(v),
    },
  });
  const [numberOfItems, setNumberOfItems] = useState<number>(appRoutes.length);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const handleItemClick = (_, itemId) => {
    const routeFullPath = itemId.split('|')[0];
    const route = getRouteByPath(routeFullPath);
    setNumberOfItems(route.children?.length || 0);
    if (route.disabled) {
      return;
    }
    navigate(route.fullPath);
  };
  const cloneItem = (node) => {
    const { fullPath, icon, label, hasDivider } = node;
    const id = uuidv4();
    const itemId = `${fullPath}|${id}`;
    return { id: node.id || fullPath, fullPath: itemId, icon, label, pinned: true, hasDivider };
  };
  const handlePinItem = (node) => {
    store.togglePinItem(cloneItem(node));
    setPinned(useExplorerTreeStore.$state().pinned.map((item) => item.id));
  };
  useEffect(() => {
    const route = getRouteByPath(location.pathname);
    if (!route) {
      return;
    }
    const items: string[] = [];
    let current = route;
    while (current) {
      items.push(current.fullPath);
      current = current.parent;
    }
    setSelectedItems(items);
  }, [location.pathname]);
  useEffect(() => {
    setHomeItems(appRoutes.filter((n) => n.group === 'home'));
    setOtherItems(appRoutes.filter((n) => !n.group));
  }, [setHomeItems, setOtherItems]);

  useEffect(() => {
    const pinnedItems = pinned.reduce((acc, path) => {
      const node = getRouteByPath(path);
      if (node) {
        acc.push(cloneItem(node));
      }
      return acc;
    }, []);
    setPinItems(pinnedItems);
  }, [pinned, setPinItems]);

  return (
    <Paper
      elevation={0}
      className="h-full bg-transparent"
      style={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ flexGrow: 1, padding: '6px 8px' }}>
        <SimpleTreeView
          aria-label="class explorer"
          className="edge-vertical-tabs-tree"
          onItemClick={handleItemClick}
          expandedItems={expandedItems}
          onExpandedItemsChange={(_, ids) => setExpandedItems(ids)}
          selectedItems={selectedItems}
          multiSelect
          expansionTrigger="iconContainer"
          sx={{
            fontSize: '13px',
            overflowY: 'auto',
            '& .MuiTreeItem-content': {
              borderRadius: '4px',
              padding: '4px 8px',
              marginBottom: '2px',
              fontWeight: 400,
              transition: 'background 0.2s, color 0.2s',
            },
            '& .MuiTreeItem-content.Mui-selected, & .MuiTreeItem-content.Mui-selected:hover': {
              backgroundColor: '#CCE4FF',
            },
            '& .MuiTreeItem-content:hover': {
              backgroundColor: '#E5F1FB',
            },
            '& .MuiTreeItem-label': {
              fontSize: '13px',
            },
            '& .MuiTreeItem-groupTransition': {
              marginLeft: '16px',
              borderLeft: '1px dashed #d4d4d8',
            },
          }}
        >
          {sections.map(({ items, group }, key) => {
            if (items.length) {
              return (
                <Fragment key={key}>
                  {key ? <hr style={{ borderColor: '#d4d4d8', margin: '6px 0' }} /> : null}
                  {items.map((node, index) => (
                    <RenderTreeItems
                      key={index}
                      node={node}
                      handlePinItem={handlePinItem}
                      expandedItems={expandedItems}
                      isPinnedContainer={group === 'pinned'}
                    ></RenderTreeItems>
                  ))}
                </Fragment>
              );
            }
            return null;
          })}
        </SimpleTreeView>
      </div>
      {numberOfItems > 0 && (
        <div className="flex gap-1 items-center px-4 py-1 border-t border-gray-200 text-sm text-gray-700 h-[42px]">
          <span className="truncate">{numberOfItems} chức năng</span>
        </div>
      )}
    </Paper>
  );
};
