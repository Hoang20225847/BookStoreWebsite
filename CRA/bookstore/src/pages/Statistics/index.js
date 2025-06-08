import styles from '../../components/Layout/AdminLayout/Admin.module.scss'
import classNames from 'classnames/bind'
import React, { useEffect, useMemo, useState } from 'react';
import {getListOrder,removeOrder} from '../../app/api/OrderApi.js'
import DiscountPrice from '../../components/function/function.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from '../../components/axios/axios.customize.js'
import EditOrderModal from '../../components/modal/EditOrderModal.js'
import { toast } from 'react-toastify';
import { getBookList} from '../../app/api/siteApi.js';

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
    const [ordersCurrent,setOrdersCurren]=useState([4])
    const [bookType,setBookType]=useState([])
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await axios.get('/admin/Statistics');
                setStats(response);
                console.log(response);
                setOrdersCurren([
                    response[5]?.listOrder?.filter(a=>a.status=='Chờ xử lý').length,
                    response[5]?.listOrder?.filter(a=>a.status=='Đang giao').length,
                    response[5]?.listOrder?.filter(a=>a.status=='Hoàn thành').length,
                    response[5]?.listOrder?.filter(a=>a.status=='Đã hủy').length,
                ]
                ) 
            }
            const fetchBook = async () =>{
                const response=await getBookList();
                const xhBooks = response.filter(a => a.category == '1');
                // Tính tổng số lượng đã bán (sold)
                const totalSoldXh = xhBooks.reduce((sum, book) => sum + (book.sold || 0), 0);
                const childBooks = response.filter(a => a.category == '2');
                // Tính tổng số lượng đã bán (sold)
                const totalSoldChild = childBooks.reduce((sum, book) => sum + (book.sold || 0), 0);
                const historyBooks = response.filter(a => a.category == '3');
                // Tính tổng số lượng đã bán (sold)
                const totalSoldHistory = historyBooks.reduce((sum, book) => sum + (book.sold || 0), 0);
                const KdBooks = response.filter(a => a.category == '4');
                // Tính tổng số lượng đã bán (sold)
                const totalSoldKd = KdBooks.reduce((sum, book) => sum + (book.sold || 0), 0);
                setBookType([
                   totalSoldXh,totalSoldChild,totalSoldHistory,totalSoldKd
                ])
            }
            fetchData();
            fetchBook();
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
                        data: stats.map(item => (item.revenueisPay + item.revenuenotPay)),
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        tension: 0.3
                    }
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
                        const value = context.dataIndex;
                        const totalOrders = stats[value]?.totalOrders||0;
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

    const countsComparisonData = useMemo(()=>({
        labels:['Đang chờ xử lý','Đang vận chuyển','Hoàn thành','Đã hủy'],
        datasets: [
            {
                label: 'Số lượng đơn hàng',
                data: ordersCurrent,
                backgroundColor: ['#f1c40f', '#3498db', '#27ae60', '#e74c3c']
            }
        ]
    }),[stats])

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Số lượng đơn hàng theo trạng thái',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Số lượng'
                },
                ticks: {
                    stepSize: 1,
                    callback: function(value) {
                        if (Math.floor(value) === value) {
                            return value;
                        }
                    }
                }
            }
        }
    }

    const revenueTypePay=useMemo(()=>{
        return{
            labels:['Đã Thanh Toán','Chưa thanh toán'],
            datasets:[{
                label:'Doanh thu: ',
                data:[stats[5]?.revenueisPay ||"0",stats[5]?.revenuenotPay|| "0"],
                backgroundColor: ['rgba(33, 150, 243, 0.85)', 'rgba(224, 224, 224, 0.85)']
            },]
        }
    },[stats[5]])
     const revenueTypeBook=useMemo(()=>{
        return{
            labels:['Sách xã hội','Sách Thiếu Nhi','Sách lịch sử','Sách kinh dị'],
            datasets:[{
                label:'Số đơn bán: ',
                data:bookType,
                backgroundColor: [
                    'rgba(76, 175, 80, 0.85)',  // Xanh lá
                    'rgba(255, 99, 132, 0.85)',  // Hồng
                    'rgba(255, 206, 86, 0.85)',  // Vàng
                    'rgba(45, 45, 45, 0.85)'     // Đen
                ]
            },]
        }
    },[bookType])

    const piechartOptions =useMemo(()=>({
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
            legend:{
                position:'right',
                labels:{
                    boxWidth: 15,
                    padding: 15,
                    font: {
                        size: 12
                    }
                }
            },
            title:{
                display:true,
                text:'Tỷ lệ doanh thu tháng hiện tại đã thanh toán',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip:{
                callbacks:{
                    label:function(context){
                        const value =context.raw *1000|| 0;
                        const total = context.chart._metasets[context.datasetIndex].total || 0;
                        const percentage=Math.round((value / total)*100);
                        return `${value.toLocaleString()} VND (${percentage}%)`;
                    }
                },
                title:function(context){
                    return context[0].label;
                }
            }
        }
    }),[stats])
    const piechartOptions2 =useMemo(()=>({
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
            legend:{
                position:'right',
                labels:{
                    boxWidth: 15,
                    padding: 15,
                    font: {
                        size: 12
                    }
                }
            },
            title:{
                display:true,
                text:'Tỷ lệ Thể loại Sách',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            },
            tooltip:{
                callbacks:{
                    label:function(context){
                        const value =context.raw || 0;
                        const total = context.chart._metasets[context.datasetIndex].total || 0;
                        const percentage=Math.round((value / total)*100);
                        return `${value.toLocaleString()}  (${percentage}%)`;
                    }
                },
                title:function(context){
                    return context[0].label;
                }
            }
        }
    }),[bookType])

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

            {/* Stats Row - Pie Charts */}
            <div className={cx('stats-row')}>
                {/* Revenue Pie Chart Section */}
                <div className={cx('revenue-pie-section')}>
                    <h3>Tỷ Lệ Thanh Toán Doanh Thu</h3>
                    <h5>Tỷ lệ thanh toán tháng này</h5>
                    <div className={cx('pie-chart-container')}>
                        {stats && <Pie data={revenueTypePay} options={piechartOptions}/>}
                    </div>
                </div>

                {/* Book Types Pie Chart Section */}
                <div className={cx('revenue-pie-section')}>
                    <h3>Tỷ Lệ thể loại sách bán</h3>
                    <h5>Tỷ lệ Mua Theo loại sách</h5>
                    <div className={cx('pie-chart-container')}>
                        {stats && <Pie data={revenueTypeBook} options={piechartOptions2}/>}
                    </div>
                </div>
            </div>

            {/* Bar Chart Section */}
            <div className={cx('order-stats-section')}>
                <div className={cx('order-stats-header')}>
                    <h3>Thống kê đơn hàng tháng này</h3>
                    <h5>Trạng thái đơn hàng</h5>
                </div>
                
                <div className={cx('order-stats-chart')}>
                    {ordersCurrent != null && 
                        <Bar data={countsComparisonData} options={barChartOptions}/>
                    }
                </div>

                <div className={cx('order-stats-legend')}>
                    <div className={cx('legend-item')}>
                        <div className={cx('legend-color', 'pending')}></div>
                        <span className={cx('legend-label')}>Đang chờ xử lý ({ordersCurrent[0]})</span>
                    </div>
                    <div className={cx('legend-item')}>
                        <div className={cx('legend-color', 'shipping')}></div>
                        <span className={cx('legend-label')}>Đang vận chuyển ({ordersCurrent[1]})</span>
                    </div>
                    <div className={cx('legend-item')}>
                        <div className={cx('legend-color', 'completed')}></div>
                        <span className={cx('legend-label')}>Hoàn thành ({ordersCurrent[2]})</span>
                    </div>
                    <div className={cx('legend-item')}>
                        <div className={cx('legend-color', 'cancelled')}></div>
                        <span className={cx('legend-label')}>Đã hủy ({ordersCurrent[3]})</span>
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