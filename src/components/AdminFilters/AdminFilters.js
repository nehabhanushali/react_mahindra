import { useEffect, useState } from "react";
import { customer_data } from "../../admin_database/AdminDatabase";
import "./AdminFilters.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AdminFilters = ({ filterData }) => {
  const [branch, setBranch] = useState("All");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  let filterType;

  const branchHandler = (e) => {
    setBranch(e.target.value);
  };
  const typeHandler = (e) => {
    setType(e.target.value);
  };
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  const getStartDate = (e) => {
    setStartDate(e);
  };
  const getEndDate = (e) => {
    setEndDate(e);
  };
  useEffect(() => {
    filteredFinalData();
  }, [type, branch, status, search, startDate, endDate]);

  const filteredFinalData = () => {
    filterType = customer_data;
    if (branch != "All") {
      filterType = filterType.filter((item) => item.branch == branch);
    }
    if (type != "All") {
      filterType = filterType.filter((item) => item.type == type);
    }
    if (status != "All") {
      filterType = filterType.filter((item) => item.status == status);
    }
    if (search != "") {
      filterType = filterType.filter((item) =>
        item.id.toString().includes(search)
      );
    }
    if (startDate != "") {
      let startDateFormat =
        startDate.getFullYear() +
        "/" +
        (startDate.getMonth() + 1) +
        "/" +
        startDate.getDate();
      filterType = filterType.filter(
        (item) =>
          new Date(item.date.split("/").reverse()) >=
          new Date(startDateFormat.split("/"))
      );
    }
    if (endDate != "") {
      let endDateFormat =
        endDate.getFullYear() +
        "/" +
        (endDate.getMonth() + 1) +
        "/" +
        endDate.getDate();
      filterType = filterType.filter(
        (item) =>
          new Date(item.date.split("/").reverse()) <=
          new Date(endDateFormat.split("/"))
      );
    }
    let filterOrder = filterType.sort(
      (a, b) =>
        new Date(a.date.split("/").reverse()) -
        new Date(b.date.split("/").reverse())
    );
    filterData(filterOrder);
  };

  const clearHandler = (e) => {
    e.preventDefault();
    setBranch("All");
    setType("All");
    setStatus("All");
    setSearch("");
    setStartDate("");
    setEndDate("");
    filterData(customer_data);
  };
  return (
    <div className="filters-main-sc">
      <div>
        <label>From:</label>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={(date) => getStartDate(date)}
        />
      </div>
      <div>
        <label>To:</label>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={endDate}
          onChange={(date) => getEndDate(date)}
          minDate={startDate}
        />
      </div>
      <div>
        <label>Branch:</label>
        <select onChange={branchHandler} value={branch}>
          <option value="All">All</option>
          <option value="Thane">Thane</option>
          <option value="Navi Mumbai">Navi Mumbai</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Kurla">Kurla</option>
          <option value="Vile Parle">Vile Parle</option>
          <option value="Lower Parel">Lower Parel</option>
          <option value="Andheri">Andheri</option>
          <option value="Byculla">Byculla</option>
        </select>
      </div>
      <div>
        <label>Type:</label>
        <select onChange={typeHandler} value={type}>
          <option value="All">All</option>
          <option value="Full">Full</option>
          <option value="Short">Short</option>
        </select>
      </div>
      <div>
        <label>Status:</label>
        <select onChange={statusHandler} value={status}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="search-id">
        <input
          type="text"
          name="idsearch"
          placeholder="Id Search"
          onChange={searchHandler}
          value={search}
        />
      </div>
      <div className="clear-filter">
        <button type="submit" onClick={clearHandler}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};
export default AdminFilters;
