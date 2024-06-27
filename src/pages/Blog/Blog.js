import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { BASE_URL } from "../../config/utils";
import useFetch from "../../hooks/useFetch";
import Address from "../../shared/Address/Address";

import styles from "./Blog.module.scss";
const cx = classNames.bind(styles);
function Blog() {
  const location = useLocation()
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const { data: blogs } = useFetch(`${BASE_URL}/blog?page=${page}`);
  const { data: blogCount } = useFetch(`${BASE_URL}/blog/count`);

  useEffect(() => {
    const pages = Math.ceil(blogCount / 3);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, blogs]);
  return (
    <section className={cx("blog-section")}>
      <Address address={location.pathname.slice(1)} />
      <div className={cx("blog-list")}>
        {blogs.map((blog) => (
          <div className={cx("blog-container")} key={blog._id}>
            <Link to="#" className={cx("title")}>
              {blog.title}
            </Link>
            <div className={cx("entry-meta")}>
              <span className={cx("byline")}>
                By <Link to="#">admin</Link>
              </span>
              <span className={cx("category")}>
                In <Link to="#">{blog.category}</Link>
              </span>
              <span className={cx("date")}>Poste {blog.date}</span>
            </div>
            <figure className={cx("blog-image")}>
              <img src={blog.image} alt="" width="1160" height="508"></img>
            </figure>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
      <div className={cx("pagination")}>
        {pageCount - page === pageCount ? (
          ""
        ) : (
          <button onClick={() => setPage(page - 1)}>
            <FaAngleLeft />
            prev
          </button>
        )}
        {[...Array(pageCount).keys()].map((number) => (
          <span
            key={number}
            onClick={() => setPage(number)}
            className={cx(page === number ? "active" : "")}
          >
            {number + 1}
          </span>
        ))}
        {pageCount - page === 1 ? (
          ""
        ) : (
          <button onClick={() => setPage(page + 1)}>
            next
            <FaAngleRight />
          </button>
        )}
      </div>
    </section>
  );
}

export default Blog;
