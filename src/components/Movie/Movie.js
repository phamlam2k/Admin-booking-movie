import { useEffect, useRef, useState } from "react";
import PrivateLayout from "../../Layout/PrivateLayout";
import { Button, Col, Input, Row, Table } from "antd";
import "../../style/Movie.css";
import axios from "axios";
import { API_MOVIES } from "../../config/endpointapi";
import { MOVIE_MODIFY } from "../../config/path";
import { Link } from "react-router-dom";

const Movie = () => {
  const value = useRef();
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getmovies = async () => {
      const params = { limit, page, keyword };
      await axios
        .get(API_MOVIES, { params })
        .then((res) => {
          setData(res?.data?.data?.data);
          setTotal(res?.data?.data?.total);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getmovies();
  }, [limit, page, keyword]);
  const onSearch = () => {
    setKeyword(value.current.input.value);
  };

  const onChangePage = (page, limit) => {
    setPage(page);
    setLimit(limit);
  };
  const columns = [
    { title: "ID Phim", dataIndex: "id" },
    {
      title: "Poster",
      render: (value, record) => {
        return (
          <>
            <img src={value.poster}/>
          </>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    { title: "Loại phim", dataIndex: "dimension" },
    { title: "Thể loại", dataIndex: "type_of_movie" },
    { title: "Ngày khởi chiếu", dataIndex: "start_date" },
    { title: "Thời lượng", dataIndex: "range_of_movie" },
    { title: "Diễn viên", dataIndex: "actor" },
    { title: "Đạo diễn", dataIndex: "director" },
    { title: "Mô tả", dataIndex: "description" },
    {
      title: "Action",
      render: (value, record) => {
        return (
          <>
            <Button>Sửa</Button>
            <Button>Xóa</Button>
          </>
        );
      },
    },
  ];
  return (
    <PrivateLayout>
      <h2 style={{ fontSize: "32px", textTransform: "uppercase" }}>
        Danh sách phim
      </h2>
      <Row>
        <Col span={22}>
          <div className="movies-search">
            <Input ref={value} placeholder="Search by First name" />
            <div className="movies-search__btn" onClick={onSearch}>
              Tìm
            </div>
          </div>
        </Col>
        <Col span={2}>
          <div className="movies-add__btn" onClick={onSearch}>
            <Link to={MOVIE_MODIFY}>Thêm phim</Link>
          </div>
        </Col>
      </Row>

      <Table
        columns={columns}
        pagination={{
          total: total,
          onChange: onChangePage,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 30],
        }}
        dataSource={data}
      />
    </PrivateLayout>
  );
};
export default Movie;
