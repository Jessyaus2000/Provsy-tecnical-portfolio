/**
 * MODULE: Performance Testing
 * TASK: Simulate 500 students submitting an exam at the same time.
 * TOOLS: k6 (Load Testing Framework)
 */

import http from 'k6/http';
import { check, sleep } from 'k6';

// TEST CONFIGURATION
export const options = {
  stages: [
    { duration: '30s', target: 50 },  // Ramp up to 50 users
    { duration: '1m', target: 500 },  // Stay at 500 users (Peak Load)
    { duration: '10s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests must complete in under 2 seconds
  },
};

export default function () {
  // 1. Define the exam submission payload
  const payload = JSON.stringify({
    studentId: 'ST-12345',
    examId: 'WAEC-BIO-2024',
    answers: ['A', 'B', 'C', 'D']
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // 2. Send the request to the server
  const res = http.post('https://api.provsy.com/v1/exams/submit', payload, params);

  // 3. Verify the server accepted it (Status 200)
  check(res, {
    'is status 200': (r) => r.status === 200,
    'transaction time < 2s': (r) => r.timings.duration < 2000,
  });

  // 4. Wait 1 second (simulate student thinking time)
  sleep(1);
}