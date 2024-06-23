import React from 'react';
import { IParams } from '@/shared/shared-interfaces';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import FormInput from '@/components/shared/form/FormInput';
import dayjs from 'dayjs';
import { TreeSelectChangeEvent, TreeSelectSelectionKeysType } from 'primereact/treeselect';
import { ISearchContainerProps } from '@/shared/utils/interface/interface-common';
import { AppDispatch } from '@/store';
import { SearchType } from '@/shared/enumeration/search-type';
import FormSelect from '../../form/FormSelect';
import FormTreeSelect from '../../form/FormTreeSelect';
import FormCalendar from '../../form/FormCalendar';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
const SearchContainer = <T extends IParams>(props: ISearchContainerProps<T>) => {
  const { filterState, setFilterState, searchContent, isShowSearch } = props;
  const dispatch = useDispatch<AppDispatch>();
  const returnTreeSelectValues = (values: string[]): TreeSelectSelectionKeysType => {
    if (!Array.isArray(values)) {
      // return {};
      values = [values];
    }

    return values.reduce((obj, curr) => ({ ...obj, [curr]: { checked: true, partialChecked: false } }), {});
  };
  const { type, mediaType, dictType } = filterState;

  return (
    <Formik
      enableReinitialize
      initialValues={filterState}
      onSubmit={(values: T) => {
        const checkForArray = (obj: any): { key: string; value: string }[] => {
          const result: { key: string; value: string }[] = [];

          for (const key in obj) {
            if (Array.isArray(obj[key]) && obj[key].length > 0) {
              const filteredArray = obj[key].filter((item: string) => item !== '');
              const joinedValue = filteredArray.join(',');
              result.push({ key, value: joinedValue });
            } else if (typeof obj[key] === 'object') {
              const nestedArrays = checkForArray(obj[key]);
              result.push(...nestedArrays);
            }
          }

          return result;
        };

        const valuesArray: { key: string; value: string }[] = checkForArray(values);
        const newValueSearch = {
          ...values,
          ...(valuesArray[0] && valuesArray[0].key ? { [valuesArray[0].key]: valuesArray[0].value } : {}),
        };
        dispatch(setFilterState(newValueSearch));
      }}
    >
      {({ values, handleSubmit, setFieldValue, resetForm }) => (
        <div className={`${isShowSearch ? 'd-none' : ''} flex flex-col row-gap-3 px-4 py-3`}>
          <div className="flex flex-col md:flex-row gap-2 md:gap-3">
            {searchContent &&
              searchContent.map((item, index) => {
                if (item.type === SearchType.TEXT) {
                  // @ts-ignore
                  const value = values && values[item.id] ? values[item.id] : '';
                  return (
                    <div key={index} className={`w-full md:w-${item?.sizeMd ?? 6}/12 xxl:w-${item?.size ?? 4}/12`}>
                      <FormInput
                        id={item.id}
                        value={value}
                        label={item.title}
                        placeholder={item.placeholder}
                        onChange={(data) => {
                          setFieldValue(item.id, data).then();
                          item.onChange && item.onChange(data);
                        }}
                      />
                    </div>
                  );
                }

                if (item.type === SearchType.SELECT) {
                  // @ts-ignore
                  const value =
                    // @ts-ignore
                    values && values[item.id]
                      ? // @ts-ignore
                        item.options?.find((item) => item.value === values[item.id])
                      : null;
                  // @ts-ignore
                  const options = item.parentItem ? (values[item.parentItem] ? item.options : []) : item.options;
                  // @ts-ignore
                  const disabled = item.parentItem ? (values[item.parentItem] ? item.disable : true) : item.disable;

                  return (
                    <div
                      key={index}
                      className={`${item.className} w-full md:w-${item?.sizeMd ?? 6}/12 xxl:w-${item?.size ?? 4}/12`}
                    >
                      <FormSelect
                        isClearable={item?.isClearable ?? true}
                        id={item.id}
                        label={item.title}
                        placeholder={item.placeholder}
                        value={item?.valueDefault || value}
                        options={options}
                        disabled={disabled}
                        onChange={(data) => {
                          if (Array.isArray(data)) return;

                          // reset child value
                          item.childItems?.forEach((child) => {
                            setFieldValue(child, '').then(() => {});
                          });

                          // set value
                          setFieldValue(item.id, data?.value).then(() => {});

                          if (!data && item?.valueDefault) {
                            item.onChange && item.onChange(data ?? '');
                            return;
                          }

                          if (data && data.value) {
                            item.onChange && item.onChange(data.value);
                            return;
                          }
                        }}
                      />
                    </div>
                  );
                }
                if (item.type === SearchType.TREE_SELECT) {
                  // @ts-ignore

                  const newValue: string[] =
                    typeof values[item.id as keyof IParams] === 'string'
                      ? (values[item.id as keyof IParams] as string).split(',').map(String)
                      : Array.isArray(values[item.id as keyof IParams])
                      ? (values[item.id as keyof IParams] as unknown as any[]).map(String)
                      : values[item.id as keyof IParams] !== undefined
                      ? [String(values[item.id as keyof IParams])]
                      : [];
                  const value =
                    // @ts-ignore
                    values && newValue
                      ? // @ts-ignore
                        returnTreeSelectValues(newValue)
                      : null;
                  // @ts-ignore
                  const convertToTreeNode = (arr: any[]): ITreeSelectOption[] => {
                    return arr?.map((value: any) => {
                      const idkKey = item.idSearch; // Extract the id property (if available)
                      const key = idkKey ? value[idkKey] : ''; // Set key only if id exists

                      return {
                        key,
                        label: value.name,
                        children: value.children ? convertToTreeNode(value.children) : [],
                      };
                    });
                  };
                  const options = convertToTreeNode(item?.optionTree || []);
                  const selectedValues = Array.isArray(values[item.id as keyof IParams])
                    ? (values[item.id as keyof IParams] as unknown as any[]).map(String)
                    : typeof values[item.id as keyof IParams] === 'undefined'
                    ? []
                    : [String(values[item.id as keyof IParams])];
                  return (
                    <div key={index} className="flex flex-col md:flex-row gap-2 md:gap-3">
                      <FormTreeSelect
                        filter
                        name={item.idSearch}
                        selectionMode={'multiple'}
                        display="chip"
                        id={item.id}
                        showClear={Array.isArray(selectedValues) && !!selectedValues.length}
                        label={item.title}
                        placeholder={item.placeholder}
                        value={value}
                        disabled={item.disable}
                        options={options}
                        onChange={(data) => {
                          const selectedKeys = Object.keys(data?.value || {});
                          item.childItems?.forEach((child) => {
                            setFieldValue(child, '').then(() => {});
                          });
                          // chuyển đổi ở đây
                          setFieldValue(item.id, selectedKeys).then(() => {});
                          if (data && selectedKeys) {
                            item.onChangeTree && item.onChangeTree(data);
                            return;
                          }
                        }}
                      />
                    </div>
                  );
                }

                if (item.type === SearchType.DATE) {
                  // @ts-ignore
                  const value = values && values[item.id] ? values[item.id] : null;
                  return (
                    <div key={index} className="flex flex-col md:flex-row gap-2 md:gap-3">
                      <FormCalendar
                        id={item.id}
                        label={item.title}
                        placeholder={item.placeholder}
                        // @ts-ignore
                        minDate={item.minDate ? dayjs(item.minDate).toDate() : ''}
                        // @ts-ignore
                        value={value ? dayjs(value).toDate() : null}
                        onChange={(data) => {
                          if (item?.childItems && item?.childItems.length > 0) {
                            item.childItems?.forEach((child) => {
                              setFieldValue(child, '').then(() => {});
                            });
                          }
                          const result = dayjs(data).format('YYYY-MM-DD');
                          setFieldValue(item.id, result).then();
                          item.onChange && item.onChange(result);
                        }}
                        showIcon={item.showIcon}
                        check={true}
                      />
                    </div>
                  );
                }
                return <React.Fragment key={index} />;
              })}
          </div>
          <div className="flex flex-row justify-center gap-2 mt-5">
            <Button
              className="m-0 inline-flex cursor-pointer select-none items-center align-bottom text-center overflow-hidden relative text-black bg-white border border-gray-400 px-5 py-2 text-base transition-all duration-200 rounded-md text-medium-sm hover:bg-gray-200"
              // onClick={() => {
              //   const initialParams: IParams = { page: 0, size: 10, type, mediaType, dictType };
              //   if ((initialParams.type && initialParams.dictType) || initialParams.dictType) {
              //     dispatch(setFilterState({ page: 0, size: 10, dictType }));
              //   } else if (initialParams.mediaType) {
              //     dispatch(setFilterState({ page: 0, size: 10, mediaType }));
              //   } else if (
              //     !searchContent?.some((item) => item.disable) &&
              //     initialParams.type &&
              //     searchContent?.some((item) => item.otherType)
              //   ) {
              //     dispatch(setFilterState(initialParams));
              //   } else if (
              //     !searchContent?.some((item) => item.disable) &&
              //     initialParams.type &&
              //     !searchContent?.some((item) => item.noValue)
              //   ) {
              //     dispatch(setFilterState(initialParams));
              //   } else if (!!searchContent?.some((item) => item.disable) && initialParams.type) {
              //     const value = searchContent.find((e: any) => e.id);
              //     const newInitialParams: any = {
              //       ...initialParams,
              //       categories:
              //         value && value.id && values[value.id as keyof IParams] && values[value.id as keyof IParams],
              //     };
              //     dispatch(setFilterState(newInitialParams));
              //   } else {
              //     dispatch(setFilterState({ page: 0, size: 10 }));
              //   }
              //   resetForm(initialParams);
              //   handleSubmit();
              // }}
              onClick={() => {
                const initialParams: IParams = {
                  page: 0,
                  size: 10,
                };
                resetForm(initialParams);
                handleSubmit();
              }}
            >
              Bỏ lọc
            </Button>
            <Button
              className="m-0 inline-flex cursor-pointer select-none items-center align-bottom text-center overflow-hidden relative text-white bg-sky-500 border border-sky-500 px-4 py-2 text-base transition-all duration-200 rounded-md text-medium-sm text-white hover:bg-sky-600"
              onClick={() => handleSubmit()}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default SearchContainer;
