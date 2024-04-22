'use client'
import React from 'react';
import DataTable from 'react-data-table-component';

// Данные для таблицы
import data from '../data/table.json';

const DataTableComponent = () => {
    // Настройки колонок таблицы
    const columns = [
        {
            name: 'Test Name',
            selector: 'testName',
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
        },
        {
            name: 'Result',
            selector: 'result',
            sortable: true,
        },
        {
            name: 'Doctor',
            selector: 'doctor',
            sortable: true,
        },
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
        },
    ];

    return (
        <div>
            <h1>Medical Test Results</h1>
            <DataTable
                title="Medical Test Results"
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                responsive
            />
        </div>
    );
};

export default DataTableComponent;