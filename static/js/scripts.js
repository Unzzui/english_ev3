document.addEventListener('DOMContentLoaded', function() {
    // Initialize slide functionality
    initializeSlides();
    
    // Create charts
    createCashGrowthChart();
    createRevenueGrowthChart();
    createCashFlowChart();
    createPerformanceSummaryChart();
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

// Chart creation functions
function createCashGrowthChart() {
    const ctx = document.getElementById('cashGrowthChart').getContext('2d');
    const cashGrowthChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2023', '2024', '2025', '2026 (Projected)'],
            datasets: [{
                label: 'Cash and Cash Equivalents (Billions USD)',
                data: [6.2, 8.6, 15.2, 18.5],
                backgroundColor: [
                    'rgba(118, 185, 0, 0.6)',
                    'rgba(118, 185, 0, 0.7)',
                    'rgba(118, 185, 0, 0.8)',
                    'rgba(118, 185, 0, 0.5)'
                ],
                borderColor: [
                    'rgba(118, 185, 0, 1)',
                    'rgba(118, 185, 0, 1)',
                    'rgba(118, 185, 0, 1)',
                    'rgba(118, 185, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed.y}B`;
                        }
                    }
                }
            }
        }
    });
}

function createRevenueGrowthChart() {
    const ctx = document.getElementById('revenueGrowthChart').getContext('2d');
    const revenueGrowthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2023', '2024', '2025', '2026 (Projected)'],
            datasets: [{
                label: 'Total Revenue (Billions USD)',
                data: [111.5, 130.0, 148.5, 167.2],
                backgroundColor: 'rgba(118, 185, 0, 0.2)',
                borderColor: 'rgba(118, 185, 0, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(118, 185, 0, 1)',
                pointBorderColor: '#fff',
                pointRadius: 6,
                pointHoverRadius: 8,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed.y}B`;
                        }
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
                    backgroundColor: 'rgba(118, 185, 0, 0.7)',
                    borderColor: 'rgba(118, 185, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Free Cash Flow (Billions USD)',
                    data: [52.3, 60.9, 72.1, 82.7],
                    backgroundColor: 'rgba(0, 112, 192, 0.7)',
                    borderColor: 'rgba(0, 112, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed.y}B`;
                        }
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
                backgroundColor: 'rgba(118, 185, 0, 0.2)',
                borderColor: 'rgba(118, 185, 0, 0.8)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(118, 185, 0, 1)',
                pointBorderColor: '#fff'
            }, {
                label: '2025',
                data: [92, 94, 88, 85, 90, 88],
                backgroundColor: 'rgba(0, 112, 192, 0.2)',
                borderColor: 'rgba(0, 112, 192, 0.8)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 112, 192, 1)',
                pointBorderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        backdropColor: 'transparent',
                        showLabelBackdrop: false
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}/100`;
                        }
                    }
                }
            }
        }
    });
} 