import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./../css/HomeStyle.css";
// require('dotenv').config()
import axios from "axios";
const Course = () => {
  const studentData = {
    name: "Nguyen Van A",
    studentId: "20077931",
    gender: "Nam",
    course: "2021-2022",
    majors: "Kỹ thuật phần mềm",
    department: "Công nghệ thông tin",
    class: "DHKTPM16A",
  };

  const getFutureCourses = (currentCourse) => {
    const courses = [];
    let [startYear, endYear] = currentCourse.split("-").map(Number);

    for (let i = 0; i < 5; i++) {
      for (let j = 1; j <= 2; j++) {
        courses.push(`HK${j} (${startYear}-${endYear})`);
      }
      startYear++;
      endYear++;
    }

    return courses;
  };

  const [semester, setSemester] = useState(`HK1 (${studentData.course})`);
  const [registrationType, setRegistrationType] = useState("hocMoi");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [registeredClasses, setRegisteredClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studyProgram, setStudyProgram] = useState([]);
  const [courseBySem, setCourseBySem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/courses"
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    const fetchSP = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/v1/course/getAllstuPro"
        );
        setStudyProgram(response.data);
      } catch (error) {
        console.error("Error fetching SP:", error);
      }
    };
    const fetchCls = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/v1/course/getReCls"
        );
        setRegisteredClasses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchData();
    fetchSP();
    fetchCls();
  }, []);

  const futureCourses = getFutureCourses(studentData.course);
  const getCoursesDetails = async (courseIds) => {
    try {
      // Gọi API để lấy danh sách chi tiết của các học phần
      const response = await axios.get("http://localhost:4000/api/v1/courses");
      const coursesDetails = response.data.courses;

      // Lọc ra chi tiết của các học phần trong danh sách courseIds
      const filteredCourses = coursesDetails.filter((course) =>
        courseIds.includes(course.id)
      );

      return filteredCourses;
    } catch (error) {
      console.error("Error fetching courses details:", error);
      return [];
    }
  };

  const handleCourseChange = async (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedSemester = event.target.options[selectedIndex].value;
    setSemester(selectedSemester);
    switch (selectedIndex) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        const semesterNumber = selectedIndex + 1;
        const selectedSemesterCourses = studyProgram.filter(
          (course) => course.semester === `HỌC KÌ ${semesterNumber}`
        );

        const electiveCourses = selectedSemesterCourses.reduce(
          (acc, course) => [...acc, ...course.electiveCourses],
          []
        );
        const requiredCourses = selectedSemesterCourses.reduce(
          (acc, course) => [...acc, ...course.requiredCourses],
          []
        );

        console.log("All Courses:", [...electiveCourses, ...requiredCourses]);

        // Lấy danh sách chi tiết của các học phần
        const coursesDetails = await getCoursesDetails([
          ...electiveCourses,
          ...requiredCourses,
        ]);
        console.log("Courses Details:", coursesDetails);
        setCourseBySem(coursesDetails);
        break;
      default:
        console.log("Invalid semester index");
        break;
    }
  };

  const handleRegistrationTypeChange = (event) => {
    setRegistrationType(event.target.value);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedClass(null); // Reset selected class when changing course
  };

  const handleClassSelect = (cls) => {
    setSelectedClass(cls);
  };

  const handleRegister = (MHP, tenLop, lich, trangThai) => {
    if (
      selectedClass.registered >= selectedClass.capacity ||
      selectedClass.status === "Đã khóa"
    ) {
      alert("Không thể đăng ký lớp này. Sĩ số đã đầy hoặc lớp đã bị khóa.");
    } else {
      const newData = {
        codeCourse: MHP,
        name: courseBySem.find((course) => course.codeCourse === selectedCourse)
          .name,
        clsName: tenLop,
        credits: 3,
        teacher: "To be assigned",
        schedule: lich,
        status: trangThai,
        student_id: studentData.studentId,
      };
      axios
        .post("http://localhost:8081/v1/course/create", newData)
        .then((response) => {
          console.log("New data added successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error adding new data:", error);
        });
      setRegisteredClasses([...registeredClasses, newData]);
      alert("Đăng ký thành công!");
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  // const courses = [
  //     { id: 1, oldId: "2113434", newId: "4203003193", name: "Toán ứng dụng", credits: 3, required: true, classes: [] },
  //     { id: 2, oldId: "2113436", newId: "4203003240", name: "Hàm phức và phép biến đổi Laplace", credits: 3, required: true, classes: [] },
  //     { id: 3, oldId: "2113435", newId: "4203003320", name: "Phương pháp tính", credits: 3, required: true, classes: [] },
  //     { id: 4, oldId: "2113438", newId: "4203003395", name: "Logic học", credits: 3, required: true, classes: [] },
  //     { id: 5, oldId: "2107492", newId: "4203003196", name: "Giao tiếp kinh doanh", credits: 3, required: true, classes: [] },
  //     { id: 6, oldId: "2132002", newId: "4203003197", name: "Kỹ năng xây dựng kế hoạch", credits: 3, required: true, classes: [] },
  // ];

  const classes = {
    4203002009: [
      {
        id: 1,
        classId: "4203002009",
        name: "Lớp A",
        schedule: "tiết 1-3 (thứ 2-4-6)",
        capacity: 80,
        registered: 40,
        status: "Đang lên kế hoạch",
      },
      {
        id: 2,
        classId: "4203002009",
        name: "Lớp B",
        schedule: "tiết 4-6 (thứ 2-4-6)",
        capacity: 80,
        registered: 66,
        status: "Đang lên kế hoạch",
      },
    ],
    4203003240: [
      {
        id: 1,
        classId: "4203003240",
        name: "Lớp A",
        schedule: "tiết 7-9 (thứ 3-5-7)",
        capacity: 80,
        registered: 20,
        status: "Đang lên kế hoạch",
      },
    ],
    4203000941: [
      {
        id: 1,
        classId: "4203000941",
        name: "Lớp C",
        schedule: "tiết 10-12 (thứ 3-5-7)",
        capacity: 80,
        registered: 20,
        status: "Đang lên kế hoạch",
      },
    ],
  };

  return (
    <div className="home-page-container">
      <div className="Info-outline1">
        <img
          src="https://tuyensinh.iuh.edu.vn/templates/2015/image/bannerIUH_small.png"
          alt="banner"
        />
      </div>
      <div className="Info-outline2">
        <div className="Info-container">
          <div className="Info-content">
            <p>Xin chào!</p>
            <h2>{studentData.name}</h2>
            <ul>
              <li>
                <strong>MSSV:</strong> {studentData.studentId}
              </li>
              <li>
                <strong>Giới tính:</strong> {studentData.gender}
              </li>
            </ul>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Đăng xuất
          </button>
        </div>
        <div className="avatar">
          <img
            src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-student-free-cartoon-character-png-image_4745962.jpg"
            alt="Avatar"
          />
        </div>
        <div className="links">
          <Link to="/Home">THÔNG TIN SINH VIÊN</Link> <br />
          <br />
          <Link to="/Course">ĐĂNG KÝ HỌC PHẦN</Link> <br />
          <br />
          <Link to="/StudyProgram">CHƯƠNG TRÌNH KHUNG</Link> <br />
          <br />
        </div>
      </div>
      <div className="Info-outline3">
        <h2>Đăng ký học phần</h2>
        <div className="registration-section">
          <label htmlFor="course-select">Đợt đăng ký:</label>
          <select
            id="course-select"
            value={semester}
            onChange={handleCourseChange}
          >
            {futureCourses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
          <div className="registration-type">
            <label>
              <input
                type="radio"
                value="hocMoi"
                checked={registrationType === "hocMoi"}
                onChange={handleRegistrationTypeChange}
              />
              Học Mới
            </label>
            <label>
              <input
                type="radio"
                value="hocLai"
                checked={registrationType === "hocLai"}
                onChange={handleRegistrationTypeChange}
              />
              Học Lại
            </label>
            <label>
              <input
                type="radio"
                value="hocCaiThien"
                checked={registrationType === "hocCaiThien"}
                onChange={handleRegistrationTypeChange}
              />
              Học Cải Thiện
            </label>
          </div>
        </div>
        <table className="courses-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã MH cũ</th>
              <th>Mã HP</th>
              <th>Tên môn học</th>
              <th>TC</th>
              <th>Bắt buộc</th>
              <th>Học phần trước (a), tiên quyết (b), song hành (c)</th>
              <th>Học phần tương đương</th>
            </tr>
          </thead>
          <tbody>
            {courseBySem.map((course, index) => (
              <tr
                key={course._id}
                onClick={() => handleCourseSelect(course.codeCourse)}
              >
                <td>{index + 1}</td>
                <td>{course.codeSub}</td>
                <td>{course.codeCourse}</td>
                <td>{course.name}</td>
                <td>{course.credits}</td>
                {/* <td>{course.required ? 'X' : ''}</td> */}
                <td>X</td>
                <td>{course.Prerequisite}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedCourse && classes[selectedCourse] && (
          <div>
            <h3>Lớp học phần chờ đăng ký</h3>
            <table className="classes-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã LHP</th>
                  <th>Tên lớp học phần</th>
                  <th>Lịch dự kiến</th>
                  <th>Sĩ số tối đa</th>
                  <th>Đã đăng ký</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {classes[selectedCourse].map((cls) => (
                  <tr key={cls.id} onClick={() => handleClassSelect(cls)}>
                    <td>{cls.id}</td>
                    <td>{cls.classId}</td>
                    <td>{cls.name}</td>
                    <td>{cls.schedule}</td>
                    <td>{cls.capacity}</td>
                    <td>{cls.registered}</td>
                    <td>{cls.status}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleRegister(
                            cls.classId,
                            cls.name,
                            cls.schedule,
                            cls.status
                          )
                        }
                      >
                        Đăng ký
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div>
          <h3>Chi tiết lớp học phần</h3>
          {selectedClass ? (
            <table className="details-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Lịch học</th>
                  <th>Nhóm</th>
                  <th>Phòng</th>
                  <th>Giảng viên</th>
                  <th>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedClass.id}</td>
                  <td>{selectedClass.schedule}</td>
                  <td>{selectedClass.name}</td>
                  <td>To be assigned</td>
                  <td>To be assigned</td>
                  <td>To be assigned</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Chưa chọn lớp học phần.</p>
          )}
        </div>

        <div>
          <h3>Lớp học phần đã đăng ký trong học kỳ này</h3>
          <table className="registered-classes-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã HP</th>
                <th>Tên môn học</th>
                <th>Tên lớp</th>
                <th>TC</th>
                <th>Giảng viên</th>
                <th>Lịch học</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {registeredClasses.map(
                (cls, index) =>
                  cls.student_id === studentData.studentId && (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{cls.codeCourse}</td>
                      <td>{cls.name}</td>
                      <td>{cls.clsName}</td>
                      <td>{cls.credits}</td>
                      <td>{cls.teacher}</td>
                      <td>{cls.schedule}</td>
                      <td>{cls.status}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Course;
