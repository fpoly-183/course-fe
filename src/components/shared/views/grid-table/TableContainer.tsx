import { ScopedColumns } from '@/shared/model/type';
import { IBaseModel, IInitialState, IParams } from '@/shared/shared-interfaces';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { TreeTable, TreeTableExpandedKeysType } from 'primereact/treetable';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import React, { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { Permission } from '@/shared/enumeration/permission';
import 'primeicons/primeicons.css';
import { Status } from '@/shared/enumeration/status';
import { TreeNode } from 'primereact/treenode';
import { IActionButton, ITableColumn, ITableProps } from '@/shared/utils/interface/interface-common';
import { AppDispatch } from '@/store';
import { RootState } from '@/reducers';
import { ButtonAlias } from '@/shared/enumeration/button-alias';
import { ButtonPosition } from '@/shared/enumeration/button-position';
import ButtonPermission from './ButtonPermission';

const TableContainer = <T extends IParams, R extends IInitialState, S extends IBaseModel>(
  props: ITableProps<T, R, S>
) => {
  const {
    filterState,
    setFilterState,
    initialState,
    tableData,
    columns,
    scopedColumns,
    actionButtons,
    onClickActionButton,
    isMultipleMode,
    selectionItems,
    setSelectionItems,
    tableTree = false,
    idKeyTable,
    showChildren,
    isLoading,
    selectStyle,
    isPaginatorHidden = false,
    selectStyleAll,
    selectionMode = undefined,
    minWidthTable = '50rem',
    dataKey,
    rowGroupMode,
    groupRowsBy,
    swapSort,
    visibleIndex = true,
    visibleAction = true,
    className,
  } = props;
  const dispatch = useDispatch<AppDispatch>();
  const user: any = useSelector((state: RootState) => state.authentication.user);
  const [columnsTemplate, setColumnsTemplate] = useState<ITableColumn[]>([]);
  const [treeTableData, setTreeTableData] = useState<TreeNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<TreeTableExpandedKeysType>();

  useEffect(() => {
    let data = [...columns];

    if (visibleIndex) {
      data = [
        {
          key: 'index',
          label: 'STT',
          frozen: true,
          headerClassName: 'text-center',
          headerStyle: {
            width: '70px',
            minWidth: '70px',
          },
        },
        ...data,
      ];
    }

    if (visibleAction) {
      data = [
        ...data,
        {
          key: 'action',
          label: 'Tác vụ',
          frozen: true,
          headerClassName: 'text-center',
          headerStyle: {
            minWidth: '150px',
          },
        },
      ];
    }
    setColumnsTemplate(data);
  }, [visibleIndex, visibleAction]);

  const markChildrenAsExpanded = (items: TreeNode[]): TreeTableExpandedKeysType => {
    let keys: TreeTableExpandedKeysType = {};

    items.forEach((item) => {
      if (!item.key) return;

      keys[item.key] = true;
      if (item.children && item.children?.length) {
        const childrenKeys = markChildrenAsExpanded(item.children);
        keys = { ...keys, ...childrenKeys };
      }
    });

    return keys;
  };

  const convertToTreeData = (data: any[]): TreeNode[] => {
    const treeData: any[] = [];

    data.forEach((item) => {
      let convertedItem = {
        ...item,
        key: item[idKeyTable],
      };

      if (item?.children) {
        convertedItem = {
          ...convertedItem,
          children: convertToTreeData(item.children),
        };
      }
      treeData.push(convertedItem);
    });

    return treeData;
  };

  useEffect(() => {
    if (!tableTree) return;

    setTreeTableData(convertToTreeData(tableData));
    const keys = markChildrenAsExpanded(convertToTreeData(tableData));
    setExpandedKeys(keys);
  }, [JSON.stringify(tableData), tableTree]);

  const renderScopedColumns: ScopedColumns = {
    ...scopedColumns,
    index: (data: any) => <div className="text-center">{data.index}</div>,
    sort: (data: any) => {
      const sortData = (data: any[], dataItem: any): any => {
        for (const item of data) {
          if (item[idKeyTable] === dataItem[idKeyTable]) {
            return { data: data, children: 1 };
          }

          if (item?.children) {
            const result = sortData(item.children, dataItem);
            if (result) {
              return result;
            }
          }
        }
      };
      const listData = sortData(tableData, data) ?? { data: [] };

      const { data: newData } = listData;
      // Sort children
      if (!data.index) {
        if (newData?.length > 1) {
          const index = newData?.findIndex((value: any) => {
            return value[idKeyTable] === data[idKeyTable];
          });
          if (index === 0) {
            return (
              <span
                onClick={() => {
                  if (swapSort) {
                    dispatch(
                      swapSort({
                        sourceId: data[idKeyTable],
                        targetId: newData[index + 1][idKeyTable],
                      })
                    );
                  }
                }}
              >
                <i
                  className="pi pi-arrow-down"
                  style={{
                    opacity: '0.6',
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                ></i>
              </span>
            );
          } else if (index === newData.length - 1) {
            return (
              <span
                onClick={() => {
                  if (swapSort) {
                    dispatch(
                      swapSort({
                        sourceId: data[idKeyTable],
                        targetId: newData[index - 1][idKeyTable],
                      })
                    );
                  }
                }}
              >
                <i
                  className="pi pi-arrow-up"
                  style={{
                    opacity: '0.6',
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                ></i>
              </span>
            );
          } else {
            return (
              <div className="flex items-center">
                <span
                  onClick={() => {
                    if (swapSort) {
                      dispatch(
                        swapSort({
                          sourceId: data[idKeyTable],
                          targetId: newData[index + 1][idKeyTable],
                        })
                      );
                    }
                  }}
                >
                  <i
                    className="pi pi-arrow-down"
                    style={{
                      opacity: '0.6',
                      cursor: 'pointer',
                    }}
                  ></i>
                </span>
                <span
                  onClick={() => {
                    if (swapSort) {
                      dispatch(
                        swapSort({
                          sourceId: data[idKeyTable],
                          targetId: newData[index - 1][idKeyTable],
                        })
                      );
                    }
                  }}
                >
                  <i
                    className="pi pi-arrow-up"
                    style={{
                      opacity: '0.6',
                      marginLeft: '10px',
                      cursor: 'pointer',
                    }}
                  ></i>
                </span>
              </div>
            );
          }
        }
      }
      // Sort parent
      else {
        if (newData?.length >= 1) {
          const index = newData.findIndex((value: any) => {
            return value[idKeyTable] === data[idKeyTable];
          });
          if (initialState.totalPages === 1 && newData?.length === 1) {
            return;
          }
          if (data.index === 1) {
            return (
              <span
                onClick={() => {
                  if (swapSort) {
                    dispatch(
                      swapSort({
                        sourceId: data[idKeyTable],
                        targetId: newData[index + 1][idKeyTable],
                      })
                    );
                  }
                }}
              >
                <i
                  className="pi pi-arrow-down"
                  style={{
                    opacity: '0.6',
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                ></i>
              </span>
            );
          } else if (!initialState.totalPages && data.index === newData.length) {
            return (
              <span
                onClick={() => {
                  if (swapSort) {
                    dispatch(
                      swapSort({
                        sourceId: data[idKeyTable],
                        targetId: newData[index - 1][idKeyTable],
                      })
                    );
                  }
                }}
              >
                <i
                  className="pi pi-arrow-up"
                  style={{
                    opacity: '0.6',
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                ></i>
              </span>
            );
          } else if (
            initialState.totalPages - 1 === filterState?.page &&
            data.index - (initialState.totalPages - 1) * filterState?.size === newData.length
          ) {
            return (
              <span
                onClick={() => {
                  if (swapSort) {
                    if (index !== 0) {
                      dispatch(
                        swapSort({
                          sourceId: data[idKeyTable],
                          targetId: newData[index - 1][idKeyTable],
                        })
                      );
                    } else {
                      dispatch(
                        swapSort({
                          sourceId: data[idKeyTable],
                          label: 'down',
                        })
                      );
                    }
                  }
                }}
              >
                <i
                  className="pi pi-arrow-up"
                  style={{
                    opacity: '0.6',
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                ></i>
              </span>
            );
          } else {
            return (
              <div className="flex items-center">
                <span
                  onClick={() => {
                    if (swapSort) {
                      if (JSON.stringify(newData[newData.length - 1]) !== JSON.stringify(data)) {
                        dispatch(
                          swapSort({
                            sourceId: data[idKeyTable],
                            targetId: newData[index + 1][idKeyTable],
                          })
                        );
                      } else {
                        dispatch(
                          swapSort({
                            sourceId: data[idKeyTable],
                            label: 'up',
                          })
                        );
                      }
                    }
                  }}
                >
                  <i
                    className="pi pi-arrow-down"
                    style={{
                      opacity: '0.6',
                      cursor: 'pointer',
                    }}
                  ></i>
                </span>
                <span
                  onClick={() => {
                    if (swapSort) {
                      if (index !== 0) {
                        dispatch(
                          swapSort({
                            sourceId: data[idKeyTable],
                            targetId: newData[index - 1][idKeyTable],
                          })
                        );
                      } else {
                        dispatch(
                          swapSort({
                            sourceId: data[idKeyTable],
                            label: 'down',
                          })
                        );
                      }
                    }
                  }}
                >
                  <i
                    className="pi pi-arrow-up"
                    style={{
                      opacity: '0.6',
                      marginLeft: '10px',
                      cursor: 'pointer',
                    }}
                  ></i>
                </span>
              </div>
            );
          }
        }
      }
    },
    action: (data: S) => {
      const nextActions: IActionButton[] = [];
      //@ts-ignore
      if (data?.systemFlag === '1') {
        const button = actionButtons.find((e) => e.alias === ButtonAlias.view);
        if (button) {
          nextActions.push({
            title: 'Xem chi tiết',
            position: ButtonPosition.table,
            alias: ButtonAlias.view,
            permission: button.permission,
          });
        }
        return;
      }

      return (
        <div className="flex justify-content-center flex-row flex-wrap gap-2">
          {nextActions.map((item, index) => (
            <ButtonPermission key={index} action={item} onClick={() => onClickActionButton(item, data)} />
          ))}
          {actionButtons?.map((item, index) => {
            //@ts-ignore
            if (data?.userId === user?.userVO?.userId && item.alias === ButtonAlias.delete) {
              return <Fragment key={index}></Fragment>;
            }

            if (item.position !== ButtonPosition.table) return <Fragment key={index}></Fragment>;

            if (item.alias === ButtonAlias.view) {
              // @ts-ignore
              if (data?.systemFlag === '1' || data?.systemFlag === '0') {
                return <ButtonPermission key={index} action={item} onClick={() => onClickActionButton(item, data)} />;
              }
            }

            if (item.alias === ButtonAlias.lock) {
              //@ts-ignore
              if (data?.lockFlag === Status.ACTIVE) {
                return <ButtonPermission key={index} action={item} onClick={() => onClickActionButton(item, data)} />;
              }

              return <Fragment key={index}></Fragment>;
            }

            if (item.alias === ButtonAlias.unlock) {
              //@ts-ignore
              if (data?.lockFlag === Status.LOCKED) {
                return <ButtonPermission key={index} action={item} onClick={() => onClickActionButton(item, data)} />;
              }

              return <Fragment key={index}></Fragment>;
            }

            return <ButtonPermission key={index} action={item} onClick={() => onClickActionButton(item, data)} />;
          })}
        </div>
      );
    },
  };

  const emptyMessage = () => (
    <div className="grid-table-empty-container">
      {isLoading ? (
        <AiOutlineLoading3Quarters className="full-page-loading-icon text-black" />
      ) : (
        <>
          {selectStyle === '' && !selectStyleAll ? (
            <p>Yêu cầu nhấn ở bên danh mục cha để hiển thị sang danh mục con</p>
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </>
      )}
    </div>
  );

  const onSelectionChange = (event: any) => {
    if (event?.value instanceof Array) {
      if (event?.type !== 'all') {
        setSelectionItems(event?.value);
        return;
      }

      if (event.value.length > 0) {
        const items = event?.value?.filter(
          (item: any) => !selectionItems.some((element) => element[idKeyTable] === item[idKeyTable])
        );
        setSelectionItems([...selectionItems, ...items]);
        return;
      }

      const items = selectionItems?.filter(
        (item: any) => !tableData?.some((element: any) => element[idKeyTable] === item[idKeyTable])
      );
      setSelectionItems(items);
      return;
    }

    // tree select
    if (tableTree) {
      const items: any[] = [];
      treeTableData.forEach((item) => {
        const selectionItems =
          item.children?.filter((child: any) => event.value[child.key] && event.value[child.key].checked) ?? [];
        const isSelectedParent = selectionItems?.length === item.children?.length;

        if (isSelectedParent) {
          selectionItems.push(item);
        }

        items.push(...selectionItems);
      });

      setSelectionItems(items);
    }
  };

  return (
    <div className="flex flex-1 flex-col ">
      {tableTree ? (
        <TreeTable
          showGridlines={true}
          className="table-container-wrapper flex-1 common-grid"
          value={isLoading ? [] : treeTableData}
          tableStyle={{ minWidth: '50rem' }}
          emptyMessage={emptyMessage}
          expandedKeys={expandedKeys}
          selectionMode={isMultipleMode ? 'checkbox' : undefined}
          selectionKeys={Object.fromEntries(selectionItems.map((item) => [item.key, { checked: true }]))}
          onSelectionChange={onSelectionChange}
          onToggle={(event) => {
            setExpandedKeys(event.value);
          }}
        >
          {columnsTemplate.map((item, index) => {
            return (
              <Column
                expander={item.expander}
                key={index}
                body={renderScopedColumns[item.key]}
                field={item.key}
                header={item.label}
                frozen={item.frozen}
                headerClassName={`text-medium-sm ${item.headerClassName ?? ''}`}
                headerStyle={item.headerStyle}
                bodyClassName={`text-medium-sm ${index === columnsTemplate.length - 1 ? 'fixed-right-column' : ''}`}
                bodyStyle={{
                  padding: '12px 12px',
                  borderTopWidth: '1px',
                  borderTopColor: '#E3E8EF',
                  borderBottomWidth: '1px',
                  borderBottomColor: '#E3E8EF',
                }}
              />
            );
          })}
        </TreeTable>
      ) : (
        <DataTable
          scrollable
          unstyled={!selectionMode}
          showGridlines={true}
          // @ts-ignore
          selectionMode={selectionMode}
          dataKey={dataKey ?? idKeyTable}
          paginator={false}
          value={isLoading ? [] : tableData}
          className={`table-container-wrapper flex-1 common-grid ${selectionMode ? 'overflow-x-auto' : ''}`}
          tableStyle={{ width: '100%', minWidth: minWidthTable }}
          selection={selectionItems}
          emptyMessage={emptyMessage}
          onSelectionChange={onSelectionChange}
          onRowClick={(item: any) => {
            if (selectStyleAll) {
              selectStyleAll(item?.data.dictType);
            }
          }}
          rowGroupMode={rowGroupMode}
          groupRowsBy={groupRowsBy}
        >
          {isMultipleMode === true && (
            <Column
              selectionMode="multiple"
              headerStyle={{ width: '44px' }}
              headerClassName="multiple-checkbox"
              bodyClassName="multiple-checkbox"
              bodyStyle={{
                padding: '12px 12px',
                borderTopWidth: '1px',
                borderTopColor: '#E3E8EF',
                borderBottomWidth: '1px',
                borderBottomColor: '#E3E8EF',
              }}
            />
          )}
          {columnsTemplate.map((item, index) => (
            <Column
              key={index}
              body={renderScopedColumns[item.key]}
              field={item.key}
              header={item.label}
              frozen={item.frozen}
              headerClassName={`text-medium-md ${item.headerClassName ?? ''}`}
              headerStyle={item.headerStyle}
              bodyClassName={`text-medium-sm ${className} ${
                index === columnsTemplate.length - 1 ? 'fixed-right-column' : ''
              }`}
              bodyStyle={{
                padding: '12px 12px',
                borderTopWidth: '1px',
                borderTopColor: '#E3E8EF',
                borderBottomWidth: '1px',
                borderBottomColor: '#E3E8EF',
              }}
            />
          ))}
        </DataTable>
      )}
      {!isLoading && tableData.length > 0 && !isPaginatorHidden && (
        <div
          className={`${
            !!showChildren ? 'd-none' : ''
          } p-4 flex flex-col row-gap-4 flex-lg-row align-items-lg-center justify-content-lg-between`}
        >
          <div className="flex flex-row flex-wrap column-gap-3 row-gap-2 align-items-center">
            <p className="text-sm m-0">
              Hiển thị {filterState.page * filterState.size + 1}-
              {(filterState.page + 1) * filterState.size > initialState.totalElements
                ? initialState.totalElements
                : (filterState.page + 1) * filterState.size}{' '}
              của {initialState.totalElements}
              {selectStyle && !selectStyleAll ? (
                <span>
                  {` thuộc kiểu `}
                  {/* <span style={{ fontWeight: 'bold' }}>
                    {selectStyle +
                      `${
                        '(' + (dictionaryList.find((dict) => dict.dictType === selectStyle)?.description ?? ' ') + ')'
                      }`}
                  </span> */}
                </span>
              ) : (
                ''
              )}
            </p>
            <Paginator
              className="grid-table-paginator"
              dropdownAppendTo="self"
              first={filterState.page * filterState.size}
              rows={filterState.size}
              totalRecords={initialState.totalElements}
              rowsPerPageOptions={[5, 10, 25, 50]}
              onPageChange={(e) => {
                dispatch(
                  setFilterState({
                    ...filterState,
                    page: e.page,
                    size: e.rows,
                  })
                );
              }}
            />
          </div>
          {selectionItems.length > 0 && (
            <div className="flex flex-row flex-wrap gap-4 align-items-center">
              <p className="text-medium-md m-0">{selectionItems.length} đã chọn</p>
              {actionButtons?.map(
                (item, index) =>
                  item.position === ButtonPosition.footer && (
                    <ButtonPermission key={index} action={item} onClick={() => onClickActionButton(item, null)} />
                  )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TableContainer;
