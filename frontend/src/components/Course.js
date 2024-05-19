import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './../css/HomeStyle.css';

const Course = () => {
    const studentData = {
        name: "Nguyen Van A",
        studentId: "123456",
        gender: "Nam",
        course: "2021-2022",
        majors: "Kỹ thuật phần mềm",
        department: "Công nghệ thông tin",
        class: "DHKTPM16A"
    };

    const getFutureCourses = (currentCourse) => {
        const courses = [];
        let [startYear, endYear] = currentCourse.split('-').map(Number);

        for (let i = 0; i < 5; i++) {
            for (let j = 1; j <= 3; j++) {
                courses.push(`HK${j} (${startYear}-${endYear})`);
            }
            startYear++;
            endYear++;
        }

        return courses;
    };

    const [semester, setSemester] = useState(`HK1 (${studentData.course})`);
    const [registrationType, setRegistrationType] = useState('hocMoi');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [registeredClasses, setRegisteredClasses] = useState([]);

    const futureCourses = getFutureCourses(studentData.course);

    const handleCourseChange = (event) => {
        setSemester(event.target.value);
    };

    const handleRegistrationTypeChange = (event) => {
        setRegistrationType(event.target.value);
    };

    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
        setSelectedClass(null);  // Reset selected class when changing course
    };

    const handleClassSelect = (cls) => {
        setSelectedClass(cls);
    };

    const handleRegister = () => {
        if (selectedClass.registered >= selectedClass.capacity || selectedClass.status === "Đã khóa") {
            alert("Không thể đăng ký lớp này. Sĩ số đã đầy hoặc lớp đã bị khóa.");
        } else {
            setRegisteredClasses([...registeredClasses, selectedClass]);
            alert("Đăng ký thành công!");
        }
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/');
    };

    const courses = [
        { id: 1, oldId: "2113434", newId: "4203003193", name: "Toán ứng dụng", credits: 3, required: true, classes: [] },
        { id: 2, oldId: "2113436", newId: "4203003240", name: "Hàm phức và phép biến đổi Laplace", credits: 3, required: true, classes: [] },
        { id: 3, oldId: "2113435", newId: "4203003320", name: "Phương pháp tính", credits: 3, required: true, classes: [] },
        { id: 4, oldId: "2113438", newId: "4203003395", name: "Logic học", credits: 3, required: true, classes: [] },
        { id: 5, oldId: "2107492", newId: "4203003196", name: "Giao tiếp kinh doanh", credits: 3, required: true, classes: [] },
        { id: 6, oldId: "2132002", newId: "4203003197", name: "Kỹ năng xây dựng kế hoạch", credits: 3, required: true, classes: [] },
    ];

    const classes = {
        "4203003193": [
            { id: 1, classId: "420300377501", name: "Lớp 1", schedule: "Mon-Wed-Fri", capacity: 80, registered: 40, status: "Đang lên kế hoạch" },
            { id: 2, classId: "420300377502", name: "Lớp 2", schedule: "Tue-Thu-Sat", capacity: 80, registered: 80, status: "Đang lên kế hoạch" },
        ],
        "4203003240": [
            { id: 1, classId: "420300377503", name: "Lớp 3", schedule: "Mon-Wed", capacity: 80, registered: 20, status: "Đang lên kế hoạch" },
        ],
    };

    return (
        <div className="home-page-container">
            <div className='Info-outline1'>
                <img src="https://tuyensinh.iuh.edu.vn/templates/2015/image/bannerIUH_small.png" alt="banner" />
            </div>
            <div className='Info-outline2'>
                <div className="Info-container">
                    <div className="Info-content">
                        <p>Xin chào!</p>
                        <h2>{studentData.name}</h2>
                        <ul>
                            <li><strong>MSSV:</strong> {studentData.studentId}</li>
                            <li><strong>Giới tính:</strong> {studentData.gender}</li>
                        </ul>
                    </div>
                    <button onClick={handleLogout} className="logout-button">Đăng xuất</button>
                </div>
                <div className="avatar">
                    <img src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-student-free-cartoon-character-png-image_4745962.jpg" alt="Avatar" />
                </div>
                <div className="links">
                    <Link to="/Home">THÔNG TIN SINH VIÊN</Link> <br /><br />
                    <Link to="/Course">ĐĂNG KÝ HỌC PHẦN</Link> <br /><br />
                    <Link to="/StudyProgram">CHƯƠNG TRÌNH KHUNG</Link> <br /><br />
                </div>
            </div>
            <div className='Info-outline3'>
                <h2>Đăng ký học phần</h2>
                <div className="registration-section">
                    <label htmlFor="course-select">Đợt đăng ký:</label>
                    <select id="course-select" value={semester} onChange={handleCourseChange}>
                        {futureCourses.map(course => (
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
                                checked={registrationType === 'hocMoi'}
                                onChange={handleRegistrationTypeChange}
                            />
                            Học Mới
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="hocLai"
                                checked={registrationType === 'hocLai'}
                                onChange={handleRegistrationTypeChange}
                            />
                            Học Lại
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="hocCaiThien"
                                checked={registrationType === 'hocCaiThien'}
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
                        {courses.map(course => (
                            <tr key={course.id} onClick={() => handleCourseSelect(course.newId)}>
                                <td>{course.id}</td>
                                <td>{course.oldId}</td>
                                <td>{course.newId}</td>
                                <td>{course.name}</td>
                                <td>{course.credits}</td>
                                <td>{course.required ? 'X' : ''}</td>
                                <td></td>
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
                                {classes[selectedCourse].map(cls => (
                                    <tr key={cls.id} onClick={() => handleClassSelect(cls)}>
                                        <td>{cls.id}</td>
                                        <td>{cls.classId}</td>
                                        <td>{cls.name}</td>
                                        <td>{cls.schedule}</td>
                                        <td>{cls.capacity}</td>
                                        <td>{cls.registered}</td>
                                        <td>{cls.status}</td>
                                        <td><button onClick={handleRegister}>Đăng ký</button></td>
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
                                <th>Nhóm</th>
                                <th>TC</th>
                                <th>Giảng viên</th>
                                <th>Thời gian</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registeredClasses.map((cls, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{selectedCourse}</td>
                                    <td>{courses.find(course => course.newId === selectedCourse).name}</td>
                                    <td>{cls.name}</td>
                                    <td>{courses.find(course => course.newId === selectedCourse).credits}</td>
                                    <td>To be assigned</td>
                                    <td>{cls.schedule}</td>
                                    <td>{cls.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Course;
