import ConfirmModal from '@/components/shared/modal/ConfirmModal';
import { RootState } from '@/reducers';

import { IBaseModel, IInitialState, IParams } from '@/shared/shared-interfaces';
import {
  IActionButton,
  ISearchContainerProps,
  ITableContainerProps,
  IUpdateModalProps,
} from '@/shared/utils/interface/interface-common';
import { AppDispatch } from '@/store';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContext } from '../../provider/ToastProvider';
import { ButtonAlias } from '@/shared/enumeration/button-alias';
import SearchContainer from './SearchContainer';
import TableContainer from './TableContainer';
import { getUserInfo } from '@/components/modules/auth/auth.api';
import { useRouter } from '@/shared/utils/hooks/useRouter';
import { useLocation } from 'react-router-dom';

export interface IGridTableProps<T extends IParams, R extends IInitialState, S extends IBaseModel>
  extends ISearchContainerProps<T>,
    ITableContainerProps<S> {
  idKeyTable: string;
  initialState: R;
  exportData?: Function;
  getEntities: Function;
  removeEntity: Function;
  resetEntity: Function;
  resetMessage: Function;
  fetching?: Function;
  lockEntities?: Function;
  unlockEntities?: Function;
  UpdateModal?: (props: IUpdateModalProps<any>) => React.JSX.Element;
  selectStyle?: string;
  isPaginatorHidden?: boolean;
  singleSearch?: { key: string; label: string };
  title?: string;
  minWidthTable?: string;
  isSort?: boolean;
  swapSort?: Function;
  selectionItems?: any[];
  canGoBack?: boolean;
  rootPath?: string;
}

const GridTable = <T extends IParams, R extends IInitialState, S extends IBaseModel>(
  props: IGridTableProps<T, R, S>
) => {
  const {
    idKeyTable,
    initialState,
    tableData,
    searchContent,
    filterState,
    setFilterState,
    getEntities,
    removeEntity,
    resetEntity,
    resetMessage,
    fetching,
    lockEntities,
    unlockEntities,
    UpdateModal,
    columns,
    scopedColumns,
    isMultipleMode,
    tableTree,
    type,
    isShowSearch,
    showChildren,
    isPaginatorHidden = false,
    selectStyle,
    actionButtons,
    singleSearch,
    title,
    minWidthTable,
    checkbox,
    rowGroupMode,
    groupRowsBy,
    isSort = false,
    swapSort,
    exportData,
    visibleIndex = true,
    visibleAction = true,
    className,
    canGoBack = false,
    rootPath,
  } = props;

  const location = useLocation().pathname;
  const { currentMenu } = useSelector((state: RootState) => state.container);
  const { navigate } = useRouter();
  const toast = useContext(ToastContext);
  const dispatch = useDispatch<AppDispatch>();

  const [item, setItem] = useState<any>();
  const [isDetail, setIsDetail] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalHistory, setModalHistory] = useState(false);
  const [modalAuthorized, setModalAuthorized] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalResetPassWord, setModalResetPassWord] = useState(false);
  const [modalReply, setModalReply] = useState(false);
  const [modalAssignment, setModalAssignment] = useState(false);

  const [selectionItems, setSelectionItems] = useState<any[]>(props.selectionItems ?? []);
  const [modalDeleteAll, setModalDeleteAll] = useState(false);
  const [modalLockAll, setModalLockAll] = useState(false);
  const [modalUnlockAll, setModalUnlockAll] = useState(false);
  const [modalUnlock, setModalUnlock] = useState(false);
  const [modalLock, setModalLock] = useState(false);

  useEffect(() => {
    if (fetching) {
      dispatch(fetching());
    }
    dispatch(getEntities(filterState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState]);

  useEffect(() => {
    return () => {
      dispatch(resetMessage());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialState.errorMessage) {
      toast.showErrorMessage(initialState.errorMessage);
      dispatch(resetEntity());
    }

    if (initialState.MessageError) {
      toast.showErrorMessage(initialState.MessageError);
      dispatch(resetMessage());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState.errorMessage, initialState.MessageError]);

  useEffect(() => {
    if (initialState.deleteEntitySuccess) {
      toast.showSuccessMessage('Xóa thành công');
      dispatch(resetEntity());
      dispatch(getEntities(filterState));
      setSelectionItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState.deleteEntitySuccess]);

  useEffect(() => {
    if (initialState.typeSuccess) {
      dispatch(getEntities(filterState));
      setSelectionItems([]);
      switch (initialState.typeSuccess) {
        case 'updateFlagStatus':
          toast.showSuccessMessage('Cập nhập trạng thái thành công');
          return;
        case 'lock':
          toast.showSuccessMessage('Khóa thành công');
          return;
        case 'unlock':
          toast.showSuccessMessage('Mở khóa thành công');
          return;
        case 'resetPassword':
          toast.showSuccessMessage('Đặt lại mật khẩu thành công');
          return;
      }
      dispatch(resetEntity());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState.typeSuccess]);

  const onClickActionButton = (action: IActionButton, data: S | null) => {
    const alias = action.alias;
    setItem(data);
    setIsDetail(alias === ButtonAlias.view);

    if (action.onClick) {
      action.onClick(isMultipleMode ? selectionItems : data);
      return;
    }

    if (alias === ButtonAlias.lock) {
      if (data) {
        setModalLock(true);
        return;
      }
      setModalLockAll(true);
      return;
    }

    if (alias === ButtonAlias.unlock) {
      if (data) {
        setModalUnlock(true);
        return;
      }

      setModalUnlockAll(true);
      return;
    }

    if (alias === ButtonAlias.resetPassword) {
      setModalResetPassWord(true);
      return;
    }

    if (alias === ButtonAlias.deleteAll) {
      setModalDeleteAll(true);
      return;
    }

    if (alias === ButtonAlias.delete) {
      setModalDelete(true);
      return;
    }

    if (alias === ButtonAlias.authorized) {
      setModalAuthorized(true);
      return;
    }

    if (alias === ButtonAlias.history) {
      setModalHistory(true);
      return;
    }

    if (alias === ButtonAlias.assignment) {
      setModalAssignment(true);
      return;
    }

    if (alias === ButtonAlias.reply) {
      setModalReply(true);
      return;
    }
    if (alias === ButtonAlias.export && !!exportData) {
      dispatch(
        exportData({
          filterState,
        })
      );
      return;
    }

    if (UpdateModal) {
      setModalUpdate(true);
      return;
    }

    const routePath = rootPath ?? location;

    if (alias === ButtonAlias.add) {
      navigate(`${routePath}/create`);
      return;
    }

    if (data && idKeyTable) {
      // @ts-ignore
      const id = data[idKeyTable];

      if (alias === ButtonAlias.view) {
        navigate(`${routePath}/detail/${id}`);
        return;
      }

      if (alias === ButtonAlias.edit) {
        navigate(`${routePath}/edit/${id}`);
        return;
      }

      if (alias === ButtonAlias.approval) {
        navigate(`${routePath}/approval/${id}`);
        return;
      }
    }
  };

  const updateModal = React.useMemo(
    () =>
      UpdateModal && (
        <UpdateModal
          visible={modalUpdate}
          isAuthorized={modalAuthorized}
          setModalAuthorized={setModalAuthorized}
          isHistory={modalHistory}
          isAssignment={modalAssignment}
          setModalAssignment={setModalAssignment}
          isReply={modalReply}
          setModalReply={setModalReply}
          setModalHistory={setModalHistory}
          setVisible={setModalUpdate}
          item={item}
          isDetail={isDetail}
          setItem={setItem}
        />
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modalUpdate, modalAuthorized, modalHistory, modalReply, modalAssignment]
  );

  const onConfirmDelete = () => {
    const id = item[idKeyTable];
    if (idKeyTable === 'customerId') {
      dispatch(removeEntity({ id: [id], type: item.type }));
    } else if (idKeyTable === 'menuId') {
      dispatch(removeEntity([id]));
      dispatch(getUserInfo());
    } else if (id) {
      dispatch(removeEntity([id]));
    }
  };

  const onConfirmResetPassword = () => {
    const id = item[idKeyTable];
    if (id) {
      // dispatch(resetPassword(id));
    }
  };

  const onConfirmDeleteAll = () => {
    const listId = selectionItems.map((item) => item[idKeyTable]);
    dispatch(removeEntity(listId));
    setSelectionItems([]);
  };

  const onConfirmLockAll = () => {
    if (lockEntities) {
      const listId = selectionItems.map((item) => item[idKeyTable]);
      dispatch(lockEntities(listId));
      setSelectionItems([]);
    }
  };

  const onConfirmUnlockAll = () => {
    if (unlockEntities) {
      const listId = selectionItems.map((item) => item[idKeyTable]);
      dispatch(unlockEntities(listId));
      setSelectionItems([]);
    }
  };

  const onConfirmUnlock = () => {
    if (unlockEntities) {
      if (idKeyTable === 'sltId') {
        dispatch(unlockEntities(item.sltId));
      } else {
        dispatch(unlockEntities({ dictId: item.dictId, id: item.id }));
      }
    }
  };

  const onConfirmLock = () => {
    if (lockEntities) {
      if (idKeyTable === 'sltId') {
        dispatch(lockEntities(item.sltId));
      } else {
        dispatch(lockEntities({ dictId: item.dictId, id: item.id }));
      }
    }
  };

  const onGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="grid-table-wrapper flex flex-col row-gap-4">
      {/*header*/}
      <div className="flex flex-col row-gap-2 flex-lg-row justify-content-lg-between">
        <div className="flex flex-row align-items-center  pt-4 pb-4">
          {canGoBack && (
            <span className="cursor-pointer opacity-50 hover-opacity" onClick={onGoBack}>
              <i className="pi pi-arrow-left"></i>
            </span>
          )}
          <span className="text-display-semibold-xs">{title || currentMenu?.name || ''}</span>
        </div>
        {/* <div className="flex flex-row flex-wrap gap-2">
          {actionButtons.map(
            (item, index) =>
              item.position === ButtonPosition.header && (
                <ButtonPermission key={index} action={item} onClick={() => onClickActionButton(item, null)} />
              )
          )}
        </div> */}
      </div>
      {/* {singleSearch && <SingleSearch setFilterState={setFilterState} filterState={filterState} data={singleSearch} />} */}
      {/*body*/}
      <div className="grid-table-container flex flex-1 flex-col bg-white row-gap-3 rounded-[14px]">
        {searchContent && (
          <SearchContainer
            filterState={filterState}
            setFilterState={setFilterState}
            searchContent={searchContent}
            isShowSearch={isShowSearch}
          />
        )}
        <TableContainer
          initialState={initialState}
          selectStyle={selectStyle}
          filterState={filterState}
          setFilterState={setFilterState}
          tableData={tableData}
          columns={columns}
          actionButtons={actionButtons}
          scopedColumns={scopedColumns}
          isMultipleMode={isMultipleMode}
          onClickActionButton={onClickActionButton}
          selectionItems={selectionItems}
          setSelectionItems={setSelectionItems}
          tableTree={tableTree}
          type={type}
          idKeyTable={idKeyTable}
          isPaginatorHidden={isPaginatorHidden}
          showChildren={showChildren}
          isLoading={initialState.loading}
          minWidthTable={minWidthTable}
          checkbox={checkbox}
          rowGroupMode={rowGroupMode}
          groupRowsBy={groupRowsBy}
          isSort={isSort}
          swapSort={swapSort}
          visibleIndex={visibleIndex}
          visibleAction={visibleAction}
          className={className}
        />
      </div>

      {updateModal}

      <ConfirmModal
        visible={modalDelete}
        setVisible={setModalDelete}
        title="Xác nhận"
        content={<p>Bạn có chắc chắn muốn xoá?</p>}
        onConfirm={onConfirmDelete}
      />

      <ConfirmModal
        visible={modalResetPassWord}
        setVisible={setModalResetPassWord}
        title="Xác nhận"
        content={<p>Bạn có chắc chắn muốn đặt lại mật khẩu?</p>}
        onConfirm={onConfirmResetPassword}
      />

      <ConfirmModal
        visible={modalDeleteAll}
        setVisible={setModalDeleteAll}
        title="Xác nhận"
        content={<p>Bạn có chắc chắn muốn xoá{selectionItems.length > 0 ? ' tất cả' : ''}?</p>}
        onConfirm={onConfirmDeleteAll}
      />

      <ConfirmModal
        visible={modalLockAll}
        setVisible={setModalLockAll}
        title="Xác nhận"
        content={<p>Bạn có chắc chắn muốn khoá{selectionItems.length > 0 ? ' tất cả' : ''}?</p>}
        onConfirm={onConfirmLockAll}
      />

      <ConfirmModal
        visible={modalUnlock}
        setVisible={setModalUnlock}
        title="Xác nhận"
        content={<p>Bạn có chắc chắn muốn mở khoá?</p>}
        onConfirm={onConfirmUnlock}
      />

      <ConfirmModal
        visible={modalLock}
        setVisible={setModalLock}
        title="Xác nhận"
        content={<p>Bạn có chắc chắn muốn khoá?</p>}
        onConfirm={onConfirmLock}
      />

      <ConfirmModal
        visible={modalUnlockAll}
        setVisible={setModalUnlockAll}
        title="Xác nhận"
        content={<p>Bạn có chắc chắn muốn mở khoá{selectionItems.length > 0 ? ' tất cả' : ''}?</p>}
        onConfirm={onConfirmUnlockAll}
      />
    </div>
  );
};

export default GridTable;
