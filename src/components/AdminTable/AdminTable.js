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
        <ul className="admin-head">
          <li>ID</li>
          <li onClick={getSortData}>
            Date
            <span>
              <TiArrowUnsorted />
            </span>
          </li>
          <li>Branch</li>
          <li>Type</li>
          <li>Amount</li>
          <li>Bank</li>
          <li>
            Requested By <br />
            (Employee Code)
          </li>
          <li>Status</li>
          <li></li>
        </ul>
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
              <ul key={index + 1}>
                <li>{id}</li>
                <li>{date}</li>
                <li>{branch}</li>
                <li>{type}</li>
                <li>{amount}</li>
                <li>{bank}</li>
                <li>
                  {requestBy} <p>({employeeCode})</p>
                </li>
                <li>{status}</li>
                <li>
                  <span
                    className="delete-icon"
                    onClick={() => deleteHandler(id)}
                  >
                    <MdAutoDelete />
                  </span>
                </li>
              </ul>
            )
          )}
        {noData && <div className="data-unavailable">No Data Found</div>}
      </div>
    </div>
  );
};

export default AdminTable;
