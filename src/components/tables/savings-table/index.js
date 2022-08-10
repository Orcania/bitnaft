/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

import formatBigNumber from 'src/utils/format-bignumber';

const SavingsTable = ({ assets }) => {
    // const [assets, setAssets] = useState([]);
    const [filter, setFilter] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    // const [loading, setLoading] = useState(true);

    const initFilter = () => {
        setFilter({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: {
                operator: FilterOperator.AND,
                constraints: [
                    {
                        value: null,
                        matchMode: FilterMatchMode.STARTS_WITH,
                    },
                ],
            },

            symbol: {
                operator: FilterOperator.AND,
                constraints: [
                    {
                        value: null,
                        matchMode: FilterMatchMode.STARTS_WITH,
                    },
                ],
            },
        });
        setGlobalFilterValue('');
    };

    const clearFilter = () => {
        initFilter();
    };

    const onGlobalFilterChange = e => {
        const { value } = e.target;

        const newFilter = { ...filter };

        newFilter.global.value = value;

        setFilter(newFilter);
        setGlobalFilterValue(value);
    };

    useEffect(() => {
        // fetch('https://restcountries.com/v3.1/all')
        //     .then(response => response.json())
        //     .then(data => {
        //         setAssets(data);
        //         // setLoading(false);
        //     });
        initFilter();
    }, []);

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <div className="control has-icons-left has-icons-right">
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Search Assets"
                        className="input has-font-roboto"
                        onKeyUp={e => {
                            if (e.key === 'Escape') {
                                clearFilter();
                            }
                        }}
                    />
                    <span className="icon is-left">
                        <i className="fas fa-search" />
                    </span>
                    {globalFilterValue.length > 0 ? (
                        <span className="icon is-right">
                            <i className="fas fa-times is-clickable" onClick={clearFilter} />
                        </span>
                    ) : null}
                </div>
            </div>
        );
    };

    const assetsNameTemplate = rowData => {
        return (
            <div className="media is-flex is-align-items-center">
                <div className="media-left">
                    <figure className="image is-48x48">
                        <Image className="is-rounded shadowed-logo" src={rowData.icon} layout="fill" alt="" />
                    </figure>
                </div>
                <div className="media-content is-clipped">
                    <div className="columns">
                        <div className="column is-3 is-flex is-flex-direction-flex-start is-align-items-center">
                            <p className="title has-text-md-black is-size-6 has-text-weight-medium">{rowData.name}</p>
                        </div>
                        <div className="column is-narrow is-flex is-flex-direction-flex-end is-align-items-center">
                            <p className="is-size-6 has-text-md-black-o-5 has-text-weight-light has-font-roboto">
                                {rowData.symbol}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const balanceBodyTemplate = rowData => {
        return (
            <p className="is-size-6 has-text-md-black has-text-weight-semi-bold has-font-pt-mono">
                {formatBigNumber(rowData.savingsBalance, rowData.decimals)}
            </p>
        );
    };

    const apyBodyTemplate = rowData => {
        return (
            <p className="is-size-6 has-text-md-black has-text-weight-semi-bold has-font-pt-mono">{rowData.apr} %</p>
        );
    };

    const header = renderHeader();

    return (
        <div className="box">
            <DataTable
                value={assets}
                paginator
                className="p-datatable-customers"
                removableSort
                rows={10}
                sortMode="multiple"
                dataKey="name"
                filters={filter}
                filterDisplay="menu"
                // loading={loading}
                responsiveLayout="scroll"
                globalFilterFields={['name', 'symbol']}
                header={header}
                emptyMessage="No assets available."
            >
                <Column
                    sortable
                    field="name"
                    header="Assets"
                    filter
                    filterPlaceholder="Search by assets"
                    body={assetsNameTemplate}
                    className="min-w-250"
                />
                <Column
                    sortable
                    field="sacvingsBalance"
                    header="Balance"
                    body={balanceBodyTemplate}
                    style={{ verticalAlign: 'middle' }}
                />
                <Column sortable field="area" header="APY" body={apyBodyTemplate} style={{ verticalAlign: 'middle' }} />
            </DataTable>
        </div>
    );
};
export default SavingsTable;
