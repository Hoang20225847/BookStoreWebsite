import styles from '../../components/Layout/AdminLayout/Admin.module.scss'
import classNames from 'classnames/bind'
import React, { useEffect, useMemo, useState } from 'react';
import {getListOrder,removeOrder} from '../../app/api/OrderApi.js'
import DiscountPrice from '../../components/function/function.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from '../../components/axios/axios.customize.js'
import EditOrderModal from '../../components/modal/EditOrderModal.js'
import { toast } from 'react-toastify';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Pie, Bar, Line } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
const cx = classNames.bind(styles);

function Statistics() {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await axios.get('/admin/Statistics');
                setStats(response);
            }
            fetchData();
        } catch(error) {
            console.log(error);
            toast.error('Không thể tải dữ liệu thống kê');
        }
    }, []);

    const monthlyTrend = useMemo(() => {
        if(stats) {
            const labels = stats.map(item => `T${item.month}/${item.year}`);
            return {
                labels,
                datasets: [
                    {
                        label: 'Doanh thu (VNĐ)',
                        data: stats.map(item => item.revenue),
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        tension: 0.3
                    },
                    
                ]
            }
        }
    }, [stats]);

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Doanh thu 6 tháng gần nhất',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.dataset.label || '';
                        const value = context.raw * 1000 || 0;
                        const formattedNumber = value.toLocaleString('vi-VN');
                        return `${label}: ${formattedNumber}đ`;
                    },
                    afterLabel:function(context){
                         
                        const value = context.dataIndex  ;
                        const totalOrders = stats[value]?.totalOrders||0 ;
                        return `Tổng đơn hàng : ${totalOrders}`;
                    }
                }
                
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Doanh thu (VNĐ)',
                },
                ticks: {
                    callback: function(value) {
                        const valuereal = value * 1000;
                        return valuereal.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
                    }
                }
            }
        }
    };

    return ( 
        <div className={cx('statistics-container')}>
            <div className={cx('admin-nav')}>
                <div className={`${cx('logo-search')} ${cx('admin-title')}`}>
                    <div>
                        <i className="fa-solid fa-chart-line"></i>
                        <span className={cx('admin-title-name')}>Thống Kê Doanh Thu</span>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className={cx('chart-section')}>
                <div className={cx('chart-container')}>
                    <h2>Biểu đồ doanh thu 6 tháng gần đây</h2>
                    <div className={cx('chart-wrapper')} style={{ height: '400px' }}>
                        {monthlyTrend && monthlyTrend.labels.length > 0 && 
                            <Line data={monthlyTrend} options={lineChartOptions} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;