import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './../css/HomeStyle.css';

const StudyProgram = () => {
    const studentData = {
        name: "Nguyen Van A",
        studentId: "123456",
        gender: "Nam",
        course: "2021-2022",
        majors: "Kỹ thuật phần mềm",
        department: "Công nghệ thông tin",
        class: "DHKTPM16A"
    };

    const studyProgram = [
        {
            semester: "HỌC KỲ 1",
            totalCredits: 11,
            requiredCourses: [
                { id: 1, code: "002009", name: "Nhập môn Tin học", credits: 3, schedule: "", prerequisites: "", status: "✓", equivalent: "" },
                { id: 2, code: "002027", name: "Chứng chỉ TOEIC 450+", credits: 2, schedule: "", prerequisites: "", status: "✓", equivalent: "" },
                { id: 3, code: "003129", name: "Kỹ năng làm việc nhóm", credits: 2, schedule: "", prerequisites: "", status: "✓", equivalent: "" },
                { id: 4, code: "003154", name: "Giáo dục Quốc phòng và An ninh 1", credits: 3, schedule: "", prerequisites: "", status: "✓", equivalent: "" },
                { id: 5, code: "003215", name: "Toán cao cấp 1", credits: 3, schedule: "", prerequisites: "", status: "✓", equivalent: "" },
                { id: 6, code: "003298", name: "Giáo dục thể chất 1", credits: 2, schedule: "", prerequisites: "", status: "✓", equivalent: "" },
                { id: 7, code: "014014", name: "Triết học Mác - Lênin", credits: 2, schedule: "", prerequisites: "", status: "✓", equivalent: "" }
            ],
            electiveCourses: []
        },
        {
            semester: "HỌC KỲ 2",
            totalCredits: 12,
            requiredCourses: [
                { id: 1, code: "003017", name: "Kỹ thuật lập trình", credits: 3, schedule: "", prerequisites: "003854(a)", status: "✓", equivalent: "" },
                { id: 2, code: "003127", name: "Hệ thống Máy tính", credits: 3, schedule: "", prerequisites: "", status: "✓", equivalent: "" },
                { id: 3, code: "003135", name: "Toán cao cấp 2", credits: 3, schedule: "", prerequisites: "", status: "✓", equivalent: "" },
                { id: 4, code: "003154", name: "Giáo dục thể chất 2", credits: 2, schedule: "", prerequisites: "", status: "✓", equivalent: "" },
                { id: 5, code: "014015", name: "Kinh tế chính trị Mác - Lênin", credits: 2, schedule: "", prerequisites: "014164(a)", status: "✓", equivalent: "" }
            ],
            electiveCourses: [
                { id: 1, code: "003209", name: "Toán ứng dụng", credits: 3, schedule: "", prerequisites: "", status: "✓", equivalent: "" },
                { id: 2, code: "003210", name: "Hàm phức và phép biến đổi Laplace", credits: 3, schedule: "", prerequisites: "", status: "✓", equivalent: "" },
                { id: 3, code: "003212", name: "Phương pháp tính", credits: 3, schedule: "", prerequisites: "", status: "✓", equivalent: "" }
            ]
        },
      
    ];

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
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
                    <img src="https://cdn-img.thethao247.vn/origin_456x0/storage/files/haibui/2023/05/16/senyamiku-cosplay-nhan-vat-kafka-trong-honkai-star-rail-280653.jpg" alt="Avatar" />
                </div>
                <div className="links">
                    <Link to="/Home">THÔNG TIN SINH VIÊN</Link> <br /><br />
                    <Link to="/Course">ĐĂNG KÝ HỌC PHẦN</Link> <br /><br />
                    <Link to="/StudyProgram">CHƯƠNG TRÌNH KHUNG</Link> <br /><br />
                </div>
            </div>
            <div className='Info-outline3'>
                <h2>CHƯƠNG TRÌNH KHUNG</h2>
                {studyProgram.map((semester, semesterIndex) => (
                    <div key={semesterIndex}>
                        <h3>{semester.semester} - TỔNG SỐ TC: {semester.totalCredits}</h3>
                        {semester.requiredCourses.length > 0 && (
                            <>
                                <h4>HỌC PHẦN BẮT BUỘC</h4>
                                <table className="study-program-table">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Mã môn học</th>
                                            <th>Tên môn học</th>
                                            <th>Mã học phần</th>
                                            <th>Học phần trước (a), tiên quyết (b), song hành (c)</th>
                                            <th>Số TCT ĐVHT</th>
                                            <th>Số tiết LT</th>
                                            <th>Số tiết TH</th>
                                            <th>Đạt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {semester.requiredCourses.map((course, courseIndex) => (
                                            <tr key={courseIndex}>
                                                <td>{course.id}</td>
                                                <td>{course.code}</td>
                                                <td>{course.name}</td>
                                                <td>{course.code}</td>
                                                <td>{course.prerequisites}</td>
                                                <td>{course.credits}</td>
                                                <td>{course.schedule}</td>
                                                <td>{course.schedule}</td>
                                                <td>{course.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                        {semester.electiveCourses.length > 0 && (
                            <>
                                <h4>HỌC PHẦN TỰ CHỌN</h4>
                                <table className="study-program-table">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Mã môn học</th>
                                            <th>Tên môn học</th>
                                            <th>Mã học phần</th>
                                            <th>Học phần trước (a), tiên quyết (b), song hành (c)</th>
                                            <th>Số TCT ĐVHT</th>
                                            <th>Số tiết LT</th>
                                            <th>Số tiết TH</th>
                                            <th>Đạt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {semester.electiveCourses.map((course, courseIndex) => (
                                            <tr key={courseIndex}>
                                                <td>{course.id}</td>
                                                <td>{course.code}</td>
                                                <td>{course.name}</td>
                                                <td>{course.code}</td>
                                                <td>{course.prerequisites}</td>
                                                <td>{course.credits}</td>
                                                <td>{course.schedule}</td>
                                                <td>{course.schedule}</td>
                                                <td>{course.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudyProgram;
