document.addEventListener('DOMContentLoaded', function() {
    // Register Chart.js plugins
    Chart.register(ChartDataLabels);
    
    // Initialize slide functionality
    initializeSlides();
    
    // Create charts when slides are visible
    observeSlides();
});

// Slide navigation functionality
function initializeSlides() {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 1;
    
    // Navigation buttons
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    const slideCounter = document.getElementById('slideCounter');
    
    // Update slide counter
    function updateSlideCounter() {
        slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
    }
    
    // Show specific slide
    function showSlide(slideNumber) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        const targetSlide = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
        if (targetSlide) {
            targetSlide.classList.add('active');
            currentSlide = slideNumber;
            updateSlideCounter();
        }
    }
    
    // Previous slide
    prevButton.addEventListener('click', function() {
        if (currentSlide > 1) {
            showSlide(currentSlide - 1);
        }
    });
    
    // Next slide
    nextButton.addEventListener('click', function() {
        if (currentSlide < totalSlides) {
            showSlide(currentSlide + 1);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            if (currentSlide > 1) {
                showSlide(currentSlide - 1);
            }
        } else if (e.key === 'ArrowRight') {
            if (currentSlide < totalSlides) {
                showSlide(currentSlide + 1);
            }
        }
    });
    
    // Initialize counter
    updateSlideCounter();
}

// Observe slides for visibility and create charts when visible
function observeSlides() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slideElement = entry.target;
                const slideNumber = slideElement.getAttribute('data-slide');
                
                // Create chart based on slide number
                switch(slideNumber) {
                    case '2':
                        if (!slideElement.hasAttribute('data-chart-created')) {
                            createCashGrowthChart();
                            slideElement.setAttribute('data-chart-created', 'true');
                        }
                        break;
                    case '3':
                        if (!slideElement.hasAttribute('data-chart-created')) {
                            createRevenueGrowthChart();
                            slideElement.setAttribute('data-chart-created', 'true');
                        }
                        break;
                    case '4':
                        if (!slideElement.hasAttribute('data-chart-created')) {
                            createCashFlowChart();
                            slideElement.setAttribute('data-chart-created', 'true');
                        }
                        break;
                    case '5':
                        if (!slideElement.hasAttribute('data-chart-created')) {
                            createPerformanceSummaryChart();
                            slideElement.setAttribute('data-chart-created', 'true');
                        }
                        break;
                }
            }
        });
    }, options);
    
    // Observe all slides
    document.querySelectorAll('.slide').forEach(slide => {
        observer.observe(slide);
    });
}

// Chart creation functions
function createCashGrowthChart() {
    const ctx = document.getElementById('cashGrowthChart').getContext('2d');
    
    // Chart gradient
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, 'rgba(118, 185, 0, 0.8)');
    gradientFill.addColorStop(1, 'rgba(118, 185, 0, 0.2)');
    
    const cashGrowthChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2023', '2024', '2025', '2026 (Projected)'],
            datasets: [{
                label: 'Cash and Cash Equivalents (Billions USD)',
                data: [6.2, 8.6, 15.2, 18.5],
                backgroundColor: [
                    'rgba(118, 185, 0, 0.7)',
                    'rgba(118, 185, 0, 0.8)',
                    'rgba(118, 185, 0, 0.9)',
                    'rgba(118, 185, 0, 0.5)'
                ],
                borderColor: [
                    'rgba(118, 185, 0, 1)',
                    'rgba(118, 185, 0, 1)',
                    'rgba(118, 185, 0, 1)',
                    'rgba(118, 185, 0, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8,
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return '$' + value + 'B';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Billions USD',
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 14,
                            weight: 'normal'
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 16
                    },
                    bodyFont: {
                        size: 14
                    },
                    padding: 15,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed.y}B`;
                        }
                    }
                },
                datalabels: {
                    color: '#ffffff',
                    anchor: 'end',
                    align: 'top',
                    offset: 0,
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    formatter: function(value) {
                        return '$' + value + 'B';
                    }
                }
            }
        }
    });
}

function createRevenueGrowthChart() {
    const ctx = document.getElementById('revenueGrowthChart').getContext('2d');
    
    // Chart gradient
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, 'rgba(118, 185, 0, 0.5)');
    gradientFill.addColorStop(1, 'rgba(118, 185, 0, 0.05)');
    
    const revenueGrowthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2023', '2024', '2025', '2026 (Projected)'],
            datasets: [{
                label: 'Total Revenue (Billions USD)',
                data: [111.5, 130.0, 148.5, 167.2],
                backgroundColor: gradientFill,
                borderColor: 'rgba(118, 185, 0, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(118, 185, 0, 1)',
                pointBorderColor: '#fff',
                pointRadius: 6,
                pointHoverRadius: 8,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return '$' + value + 'B';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Billions USD',
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 14,
                            weight: 'normal'
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 16
                    },
                    bodyFont: {
                        size: 14
                    },
                    padding: 15,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed.y}B`;
                        }
                    }
                },
                datalabels: {
                    color: '#ffffff',
                    backgroundColor: 'rgba(118, 185, 0, 0.8)',
                    borderRadius: 4,
                    padding: 6,
                    anchor: 'end',
                    align: 'top',
                    offset: 0,
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    formatter: function(value) {
                        return '$' + value + 'B';
                    }
                }
            }
        }
    });
}

function createCashFlowChart() {
    const ctx = document.getElementById('cashFlowChart').getContext('2d');
    
    const cashFlowChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2023', '2024', '2025', '2026 (Projected)'],
            datasets: [
                {
                    label: 'Operating Cash Flow (Billions USD)',
                    data: [58.0, 68.2, 80.5, 93.1],
                    backgroundColor: 'rgba(118, 185, 0, 0.8)',
                    borderColor: 'rgba(118, 185, 0, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#ffffff'
                },
                {
                    label: 'Free Cash Flow (Billions USD)',
                    data: [52.3, 60.9, 72.1, 82.7],
                    backgroundColor: 'rgba(0, 112, 192, 0.8)',
                    borderColor: 'rgba(0, 112, 192, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#ffffff'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return '$' + value + 'B';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Billions USD',
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 14,
                            weight: 'normal'
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 16
                    },
                    bodyFont: {
                        size: 14
                    },
                    padding: 15,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed.y}B`;
                        }
                    }
                },
                datalabels: {
                    color: '#ffffff',
                    anchor: 'end',
                    align: 'top',
                    offset: 0,
                    font: {
                        weight: 'bold',
                        size: 12
                    },
                    formatter: function(value) {
                        return '$' + value + 'B';
                    }
                }
            }
        }
    });
}

function createPerformanceSummaryChart() {
    const ctx = document.getElementById('performanceSummaryChart').getContext('2d');
    
    const performanceSummaryChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Revenue Growth',
                'Profit Margin',
                'Cash Flow',
                'R&D Investment',
                'Market Share',
                'Debt Ratio'
            ],
            datasets: [{
                label: '2024',
                data: [85, 88, 80, 75, 82, 90],
                backgroundColor: 'rgba(118, 185, 0, 0.3)',
                borderColor: 'rgba(118, 185, 0, 0.8)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(118, 185, 0, 1)',
                pointBorderColor: '#fff',
                pointHoverRadius: 8,
                pointRadius: 6
            }, {
                label: '2025',
                data: [92, 94, 88, 85, 90, 88],
                backgroundColor: 'rgba(0, 112, 192, 0.3)',
                borderColor: 'rgba(0, 112, 192, 0.8)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 112, 192, 1)',
                pointBorderColor: '#fff',
                pointHoverRadius: 8,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        backdropColor: 'transparent',
                        showLabelBackdrop: false,
                        font: {
                            size: 10
                        },
                        stepSize: 20
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'center',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: {
                            size: 14
                        },
                        boxWidth: 15,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 16
                    },
                    bodyFont: {
                        size: 14
                    },
                    padding: 15,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}/100`;
                        }
                    }
                },
                datalabels: {
                    display: false
                }
            }
        }
    });
} 