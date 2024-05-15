import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './../css/HomeStyle.css';

const Home = () => {
    const studentData = {
        name: "Nguyen Van A",
        studentId: "123456",
        gender: "Nam",
        course: "2021-2022",
        majors: "Kỹ thuật phần mềm",
        department: "Công nghệ thông tin",
        class: "DHKTPM16A"
    };

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
                <h2>THÔNG TIN SINH VIÊN</h2>
                <div className='Info-student-container'>
                    <div className="Info-student">
                        <ul>
                            <li>Khóa: <strong>{studentData.course}</strong></li>
                            <li>Bậc đào tạo: <strong>Đại học</strong></li>
                            <li>Ngành: <strong>{studentData.majors}</strong> </li>
                            <li>Khoa:  <strong>{studentData.department}</strong></li>
                        </ul>
                    </div>
                    <div className="Info-student">
                        <ul>
                            <li>Lớp:  <strong>{studentData.class}</strong></li>
                            <li>Loại hình đạo tạo: <strong>Chính quy</strong></li>
                            <li>Chuyên ngành: <strong>{studentData.majors}</strong> </li>
                            <li>Cơ sở:  <strong>Cơ sở 1 (Thành phố Hồ Chí Minh)</strong></li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
