import React, { useEffect, useState } from "react";
import "./AdminTable.css";
import { MdAutoDelete } from "react-icons/md";
import AdminFilters from "../AdminFilters/AdminFilters";
import { TiArrowUnsorted } from "react-icons/ti";
const AdminTable = () => {
  const [data, setData] = useState("");
  const [filterData, setFilterData] = useState("");
  const [noData, setNoData] = useState(false);
  useEffect(() => {
    if (filterData) {
      setData(filterData);
      setNoData(false);
    }

    if (data && filterData == "") {
      setNoData(true);
    }
  }, [filterData]);
  const deleteHandler = (id) => {
    let deleteItem = filterData.filter((item) => item.id !== id);
    setFilterData(deleteItem);
  };
  const getSortData = () => {
    let sorting = [...filterData].reverse();
    setFilterData(sorting);
  };
  return (
    <div>
      <AdminFilters filterData={setFilterData} />
      <div className="admin-table-main">
        <p>Total Records: {filterData.length}</p>
        <table>
          <thead>
            <td>ID</td>
            <td onClick={getSortData}>
              Date
              <span>
                <TiArrowUnsorted />
              </span>
            </td>
            <td>Branch</td>
            <td>Type</td>
            <td>Amount</td>
            <td>Bank</td>
            <td>
              Requested By <br />
              (Employee Code)
            </td>
            <td>Status</td>
            <td></td>
          </thead>
          <tbody>
            {data &&
              data.map(
                (
                  {
                    id,
                    date,
                    branch,
                    type,
                    amount,
                    bank,
                    requestBy,
                    employeeCode,
                    status,
                  },
                  index
                ) => (
                  <tr key={index + 1}>
                    <td>{id}</td>
                    <td>{date}</td>
                    <td>{branch}</td>
                    <td>{type}</td>
                    <td>{amount}</td>
                    <td>{bank}</td>
                    <td>
                      {requestBy} <p>({employeeCode})</p>
                    </td>
                    <td>{status}</td>
                    <td className="text-center">
                      <span
                        className="delete-icon"
                        onClick={() => deleteHandler(id)}
                      >
                        <MdAutoDelete />
                      </span>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>

        {noData && <div className="data-unavailable">No Data Found</div>}
      </div>
    </div>
  );
};

export default AdminTable;
