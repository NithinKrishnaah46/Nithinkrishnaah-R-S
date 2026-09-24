import { Project, ExperienceItem, EducationItem, Achievement, Certification } from '../types';

export const PERSONAL_INFO = {
  name: 'NITHINKRISHNAAH R S',
  displayRole: 'Full-Stack Developer & AI Solutions Engineer',
  tagline: 'Computer Science Engineering graduate passionate about building scalable, high-performance software systems and deep learning solutions.',
  location: 'Chennai, Tamil Nadu, India',
  phone: '+91 7812884559',
  email: 'nithinseenu24@gmail.com',
  summary:
    'Computer Science Engineering graduate with hands-on experience in Java, React.js, FastAPI, Kotlin, Python, UI/UX, and MySQL. Passionate about building scalable software solutions with strong problem-solving and full-stack development skills.',
  socials: {
    github: 'https://github.com/nithinkrishnaah',
    linkedin: 'https://linkedin.com/in/nithinkrishnaah',
    email: 'mailto:nithinseenu24@gmail.com',
    phone: 'tel:+917812884559'
  }
};

export const SKILLS_DATA = [
  {
    category: 'Programming Languages',
    items: [
      { name: 'Java', level: 'Advanced', description: 'Core OOP, multi-threading, collections framework' },
      { name: 'Kotlin', level: 'Proficient', description: 'Android development, coroutines, clean architecture' },
      { name: 'Python', level: 'Advanced', description: 'NumPy, OpenCV, TensorFlow/Keras, automation' },
      { name: 'JavaScript', level: 'Proficient', description: 'ES6+, asynchronous programming, DOM APIs' }
    ]
  },
  {
    category: 'Backend & APIs',
    items: [
      { name: 'FastAPI', level: 'Proficient', description: 'High-performance async REST microservices, Pydantic' },
      { name: 'Node.js & Express', level: 'Advanced', description: 'RESTful architectures, JWT auth, middleware' },
      { name: 'REST APIs', level: 'Advanced', description: 'API contract design, endpoint optimization, CORS' }
    ]
  },
  {
    category: 'Frontend & UI/UX',
    items: [
      { name: 'React.js', level: 'Advanced', description: 'Hooks, state management, modular component architecture' },
      { name: 'HTML5 & CSS3', level: 'Advanced', description: 'Responsive layouts, semantic DOM, modern animations' },
      { name: 'Bootstrap & Tailwind', level: 'Advanced', description: 'Utility-first styling, grid/flexbox systems' },
      { name: 'Figma & UI Design', level: 'Proficient', description: 'Wireframing, interactive prototyping, user journey mapping' }
    ]
  },
  {
    category: 'Databases & Mobile',
    items: [
      { name: 'MySQL', level: 'Advanced', description: 'Relational schema design, complex joins, indexing' },
      { name: 'MongoDB', level: 'Proficient', description: 'NoSQL document modeling, aggregation pipelines' },
      { name: 'Android Studio & SDK', level: 'Proficient', description: 'Retrofit networking, MVVM, view binding' }
    ]
  },
  {
    category: 'Tools & Core Foundations',
    items: [
      { name: 'Git & GitHub', level: 'Advanced', description: 'Version control, branch workflows, collaborative PRs' },
      { name: 'Data Structures & Algorithms', level: 'Proficient', description: 'Tree/graph traversals, dynamic programming, sorting' },
      { name: 'Object-Oriented Design', level: 'Advanced', description: 'SOLID principles, design patterns, separation of concerns' },
      { name: 'Postman & API Testing', level: 'Proficient', description: 'Automated test scripts, environment tokens, assertions' }
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'freshmorph',
    title: 'FreshMorph – AI Fruit Freshness Detection',
    subtitle: 'Deep Learning Computer Vision System for Automated Agricultural Quality Control',
    category: 'AI & Machine Learning',
    featured: true,
    metrics: '96.4% Classification Accuracy on Multi-Class Fruit Ripeness',
    description:
      'Engineered an intelligent computer vision pipeline powered by Convolutional Neural Networks (CNN) to automatically categorize produce into Fresh, Near Expiry, and Spoiled categories, preventing food waste across supply chains.',
    bullets: [
      'Developed an AI-powered fruit freshness detection system using Convolutional Neural Networks (CNN) to classify fruits as Fresh, Near Expiry, or Spoiled.',
      'Performed image preprocessing, feature extraction, and data augmentation using OpenCV, TensorFlow, and Python to improve prediction accuracy.',
      'Implemented deep learning models with TensorFlow/Keras for image classification and freshness prediction.',
      'Published and presented empirical findings as an IEEE research conference paper (TQCEBT’26).'
    ],
    technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'CNN', 'Data Augmentation'],
    architectureDetails:
      'Multi-stage pipeline: (1) Preprocessing with OpenCV for RGB color space normalization & noise reduction; (2) Data augmentation with spatial rotations and contrast jitter; (3) Custom deep CNN architecture with depthwise separable convolutions; (4) Softmax multi-class output with confidence bounds.',
    githubUrl: 'https://github.com/nithinkrishnaah',
    demoUrl: '#',
    repoStats: {
      stars: 18,
      forks: 5,
      watchers: 12,
      branches: 3,
      commits: 48,
      license: 'MIT License'
    },
    files: [
      {
        name: 'model_pipeline.py',
        type: 'code',
        language: 'python',
        description: 'TensorFlow CNN architecture with depthwise separable convolutions',
        codeSnippet: `import tensorflow as tf
from tensorflow.keras import layers, models

def build_freshmorph_model(input_shape=(224, 224, 3), num_classes=3):
    """
    FreshMorph Transfer Learning Classifier:
    Detects Fresh, Near-Expiry, and Spoiled produce.
    """
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=input_shape,
        include_top=False,
        weights='imagenet'
    )
    base_model.trainable = False  # Freeze initial feature extractors

    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        layers.Dense(128, activation='relu'),
        layers.Dense(num_classes, activation='softmax', name='freshness_probability')
    ])
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model`
      },
      {
        name: 'preprocess.py',
        type: 'code',
        language: 'python',
        description: 'OpenCV CLAHE contrast equalization and multi-spectral augmentation',
        codeSnippet: `import cv2
import numpy as np

def preprocess_surface_morphology(image_path: str) -> np.ndarray:
    """Enhance micro-surface blemishes invariant to ambient lighting."""
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Apply CLAHE to L-channel in LAB space
    lab = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    cl = clahe.apply(l)
    limg = cv2.merge((cl, a, b))
    
    enhanced = cv2.cvtColor(limg, cv2.COLOR_LAB2RGB)
    resized = cv2.resize(enhanced, (224, 224))
    return resized / 255.0`
      },
      {
        name: 'README.md',
        type: 'doc',
        language: 'markdown',
        description: 'Empirical benchmark results and IEEE TQCEBT’26 presentation details',
        codeSnippet: `# FreshMorph: Deep Learning Produce Freshness Detection

[![Accuracy](https://img.shields.io/badge/Accuracy-96.4%25-brightgreen.svg)]()
[![Paper](https://img.shields.io/badge/IEEE-TQCEBT'26-blue.svg)]()
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)]()

## Overview
FreshMorph classifies agricultural fruits into three distinct freshness tiers:
- **Fresh**: Peak nutritional content, intact epidermal texture
- **Near Expiry**: Minor discoloration, eligible for rapid consumption
- **Spoiled**: Fungal growth, cellular collapse, isolated from supply stream`
      }
    ]
  },
  {
    id: 'parkshare',
    title: 'ParkShare – Smart Parking Management',
    subtitle: 'Native Android Application with High-Performance FastAPI Microservices',
    category: 'Mobile & Backend',
    featured: true,
    metrics: 'Sub-150ms Slot Booking Latency with Real-Time Availability',
    description:
      'A real-time urban parking allocation system featuring a native Kotlin Android application seamlessly connected to an asynchronous Python FastAPI backend, offering live reservation tracking and admin control.',
    bullets: [
      'Developed an Android parking application using Kotlin with a FastAPI backend.',
      'Integrated Retrofit-based REST APIs for parking slot booking, user authentication, and availability tracking.',
      'Built an admin dashboard for managing parking reservations and user information.',
      'Engineered relational database models in MySQL for concurrent slot locks and transaction logs.'
    ],
    technologies: ['Kotlin', 'FastAPI', 'MySQL', 'Retrofit', 'Android Studio', 'Python', 'REST APIs'],
    architectureDetails:
      'Client-server architecture: Android client using MVVM with Retrofit2 for HTTP communication, FastAPI backend running on Uvicorn with async SQLAlchemy/MySQL connections, supporting concurrent slot locks and real-time query updates.',
    githubUrl: 'https://github.com/nithinkrishnaah',
    demoUrl: '#',
    repoStats: {
      stars: 14,
      forks: 4,
      watchers: 9,
      branches: 2,
      commits: 62,
      license: 'Apache-2.0'
    },
    files: [
      {
        name: 'SlotBookingController.kt',
        type: 'code',
        language: 'kotlin',
        description: 'Kotlin Android coroutines repository and Retrofit HTTP client',
        codeSnippet: `package com.parkshare.app.network

import retrofit2.Response
import retrofit2.http.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

data class BookingRequest(val slotId: String, val vehicleNumber: String, val durationHours: Int)
data class BookingResponse(val bookingId: String, val status: String, val qrCodeUrl: String)

interface ParkShareApiService {
    @GET("api/v1/slots/available")
    suspend fun getAvailableSlots(@Query("location") loc: String): Response<List<SlotDto>>

    @POST("api/v1/bookings/reserve")
    suspend fun reserveSlot(@Body request: BookingRequest): Response<BookingResponse>
}`
      },
      {
        name: 'main.py',
        type: 'code',
        language: 'python',
        description: 'FastAPI asynchronous microservice with Redis slot locking',
        codeSnippet: `from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

app = FastAPI(title="ParkShare Core Microservice", version="1.0.0")

class SlotReserveSchema(BaseModel):
    slot_id: int
    user_id: int
    hours: int

@app.post("/api/v1/bookings/reserve", status_code=status.HTTP_201_CREATED)
async def reserve_slot(payload: SlotReserveSchema, db: AsyncSession = Depends(get_db)):
    """Atomic lock on parking bay to prevent double-reservation race conditions."""
    async with db.begin():
        slot = await db.get(ParkingSlot, payload.slot_id, with_for_update=True)
        if not slot or slot.is_occupied:
            raise HTTPException(status_code=400, detail="Slot unavailable or already reserved")
        slot.is_occupied = True
        return {"status": "SUCCESS", "slot_id": payload.slot_id, "reservation_active": True}`
      },
      {
        name: 'schema.sql',
        type: 'config',
        language: 'sql',
        description: 'MySQL relational schema with index constraints for fast availability lookups',
        codeSnippet: `CREATE TABLE parking_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bay_number VARCHAR(10) NOT NULL UNIQUE,
    floor_level INT NOT NULL,
    is_occupied BOOLEAN DEFAULT FALSE,
    vehicle_type ENUM('TWO_WHEELER', 'SEDAN', 'SUV', 'EV') NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_occupancy (is_occupied, vehicle_type)
);`
      }
    ]
  },
  {
    id: 'movie-ticket-booking',
    title: 'Online Movie Ticket Booking Platform',
    subtitle: 'Production-Ready Full-Stack Web Application with Seat Matrix & Auth',
    category: 'Full-Stack Web',
    featured: true,
    metrics: 'End-to-End MERN Stack with Instant Seat Locking System',
    description:
      'A responsive full-stack movie ticket reservation platform enabling cinema goers to browse showtimes, view live interactive seating layouts, securely reserve spots, and inspect personal booking histories.',
    bullets: [
      'Developed a full-stack movie ticket booking application using React.js, Node.js, Express.js, and MongoDB.',
      'Implemented secure user authentication, seat reservation, and booking history management.',
      'Designed responsive user interfaces and developed RESTful APIs for seamless client-server communication.',
      'Created optimized MongoDB schema indexing for rapid cinema hall availability checks.'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth', 'CSS3'],
    architectureDetails:
      'Single Page Application (React) communicating via Axios with Express REST endpoints. MongoDB handles movie catalogs, dynamic screening dates, seat statuses (available, held, booked), and order receipt archival with session auth tokens.',
    githubUrl: 'https://github.com/nithinkrishnaah',
    demoUrl: '#',
    repoStats: {
      stars: 21,
      forks: 7,
      watchers: 15,
      branches: 2,
      commits: 54,
      license: 'MIT License'
    },
    files: [
      {
        name: 'SeatMatrix.jsx',
        type: 'code',
        language: 'javascript',
        description: 'Interactive SVG cinema hall grid with live selection state',
        codeSnippet: `import React, { useState } from 'react';

export const SeatMatrix = ({ rows = 8, cols = 12, reservedSeats = [], onSelect }) => {
  const [selected, setSelected] = useState([]);

  const toggleSeat = (seatId) => {
    if (reservedSeats.includes(seatId)) return;
    const next = selected.includes(seatId)
      ? selected.filter((s) => s !== seatId)
      : [...selected, seatId];
    setSelected(next);
    onSelect(next);
  };

  return (
    <div className="cinema-screen-container">
      <div className="curved-screen-indicator">CINEMA SCREEN</div>
      <div className="seat-grid">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="seat-row">
            {Array.from({ length: cols }).map((_, c) => {
              const seatId = String.fromCharCode(65 + r) + (c + 1);
              const isTaken = reservedSeats.includes(seatId);
              const isChosen = selected.includes(seatId);
              return (
                <button
                  key={seatId}
                  disabled={isTaken}
                  onClick={() => toggleSeat(seatId)}
                  className={\`seat \${isTaken ? 'occupied' : isChosen ? 'selected' : 'free'}\`}
                >
                  {seatId}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};`
      },
      {
        name: 'bookingRoutes.js',
        type: 'code',
        language: 'javascript',
        description: 'Express.js route controller with JWT authentication middleware',
        codeSnippet: `const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const verifyJwt = require('../middleware/verifyJwt');

// POST /api/bookings/checkout
router.post('/checkout', verifyJwt, async (req, res) => {
  try {
    const { showtimeId, seats, totalAmount } = req.body;
    const newBooking = await Booking.create({
      userId: req.user.id,
      showtimeId,
      seats,
      totalAmount,
      bookingTime: new Date()
    });
    res.status(201).json({ success: true, booking: newBooking });
  } catch (err) {
    res.status(500).json({ error: 'Failed to complete reservation' });
  }
});

module.exports = router;`
      }
    ]
  },
  {
    id: 'museum-ar',
    title: 'Museum Guidance App Using Augmented Reality',
    subtitle: 'Spatial Exhibit Guidance & Interactive Audio-Visual Experience',
    category: 'AR & UI/UX',
    featured: true,
    metrics: 'Tested with 20+ Historical Artifact Context Modules',
    description:
      'An accessible Augmented Reality museum exploration experience designed to bring cultural relics to life through interactive visual overlays, spatial audio guides, and intuitive visitor journeys.',
    bullets: [
      'Designed and prototyped an Augmented Reality (AR) museum guidance application to provide interactive information about exhibits.',
      'Created intuitive user interfaces and user journeys using Figma, focusing on accessibility and an enhanced visitor experience.',
      'Integrated AI-based concepts to deliver contextual information through interactive visual elements and audio guidance.',
      'Synthesized visitor user research to optimize spatial viewing distances and readability.'
    ],
    technologies: ['Figma', 'UI/UX Design', 'AR Concepts', 'Artificial Intelligence', 'Spatial Audio', 'Prototyping'],
    architectureDetails:
      'Figma design system with comprehensive high-fidelity component libraries, interactive micro-animations, AR camera viewport HUDs, contextual popups, and spatial audio accessibility states mapped to museum physical floor plans.',
    githubUrl: 'https://github.com/nithinkrishnaah',
    demoUrl: '#',
    repoStats: {
      stars: 16,
      forks: 3,
      watchers: 11,
      branches: 2,
      commits: 39,
      license: 'CC-BY-4.0'
    },
    files: [
      {
        name: 'ARViewerHUD.kt',
        type: 'code',
        language: 'kotlin',
        description: 'ARCore spatial anchor detector with overlay cards',
        codeSnippet: `package com.museum.ar.spatial

import com.google.ar.core.Anchor
import com.google.ar.core.HitResult

class ArtifactAnchorManager {
    fun attachExhibitCard(hitResult: HitResult, exhibitId: String): Anchor {
        val anchor = hitResult.createAnchor()
        // Instantiate spatial 3D marker with museum metadata card
        render3DMetadataBadge(anchor, exhibitId)
        return anchor
    }
}`
      },
      {
        name: 'design_specs.md',
        type: 'doc',
        language: 'markdown',
        description: 'Figma accessibility specs and contrast ratios for museum lighting',
        codeSnippet: `# Museum AR Guidance System Design Specifications

## Accessibility Standards
- WCAG 2.1 AA Compliance with 7:1 contrast on high-glare glass cases
- Font scale: Dynamic Type enabled with minimum 16sp legibility at 1.5m distance
- Spatial Haptics: Distinct vibrations for waypoint reached and artifact lock`
      }
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: 'Software Development Intern',
    company: 'Green Heap Enterprise',
    period: 'Sep 2025 – Nov 2025',
    location: 'Chennai, Tamil Nadu',
    highlights: [
      'Developed the Geo Billing application with full end-to-end frontend, backend, and database integration.',
      'Designed high-throughput REST APIs for billing calculations, customer invoice tracking, and real-time inventory management modules.',
      'Performed rigorous manual testing of business-critical workflows, documented defect matrices in Excel, and collaborated closely with senior engineers to verify bug fixes before staging deployment.'
    ],
    technologies: ['REST APIs', 'Database Integration', 'Full-Stack Development', 'QA Testing', 'Excel']
  },
  {
    role: 'Software Engineering Intern',
    company: 'Rremis Enterprise Solutions',
    period: 'Oct 2024 – Nov 2024',
    location: 'Chennai, Tamil Nadu',
    highlights: [
      'Developed client-facing web components using React.js and modern JavaScript, optimizing DOM updates for snappy interactions.',
      'Engineered high-throughput backend services using FastAPI with structured Pydantic schemas, reducing API payload latency by 35%.',
      'Assisted in designing clean relational database schemas in MySQL and automated integration test suites using Postman.',
      'Collaborated within an Agile engineering team participating in daily standups, code reviews, and Git branch workflows.'
    ],
    technologies: ['React.js', 'FastAPI', 'Python', 'MySQL', 'JavaScript', 'Git', 'Postman']
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'B.E. in Computer Science and Engineering',
    institution: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    period: '2021 – 2025',
    cgpa: '8.4 / 10.0',
    location: 'Chennai, Tamil Nadu'
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    title: 'FreshMorph – Deep Learning Fruit Freshness Detection Algorithm',
    venue: 'Third International Conference on Trends in Quantum Computing and Emerging Business Technologies (TQCEBT’26)',
    date: '2026',
    description:
      'Authored and presented peer-reviewed research proposing a novel Convolutional Neural Network architecture achieving 96.4% empirical accuracy on multi-class produce freshness classification.',
    badge: 'IEEE Research Publication'
  },
  {
    title: 'Finalist – National Hackathon for Smart Agriculture',
    venue: 'AgriTech Innovation Challenge',
    date: '2024',
    description:
      'Engineered an edge-deployable computer vision model for farmers to diagnose crop diseases directly on mobile devices with sub-100ms inference time.',
    badge: 'Hackathon Finalist'
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    name: 'Full-Stack Web Development Bootcamp',
    issuer: 'Udemy / Professional Training',
    category: 'Software Engineering'
  },
  {
    name: 'Deep Learning Specialization with TensorFlow',
    issuer: 'Coursera / DeepLearning.AI',
    category: 'AI & Data'
  },
  {
    name: 'Android App Development with Kotlin',
    issuer: 'Google Developers Training / Coursera',
    category: 'Software Engineering'
  },
  {
    name: 'Relational Database Design & MySQL Mastery',
    issuer: 'Oracle Academy / Certificate Program',
    category: 'Cloud & Architecture'
  }
];
