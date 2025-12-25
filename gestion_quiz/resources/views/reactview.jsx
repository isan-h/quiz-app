// import React, { useState, useEffect } from 'react';

// // ============================================================================
// // UTILITY FUNCTIONS
// // ============================================================================

// // Generate a random 6-digit quiz key
// const generateQuizKey = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // Calculate quiz score
// const calculateScore = (answers, questions) => {
//     let correct = 0;
//     questions.forEach((q, idx) => {
//         const userAnswer = answers[idx];
//         if (q.type === 'QCU') {
//             if (userAnswer === q.correctAnswer) correct++;
//         } else {
//             // QCM - check if arrays match
//             const correctAnswers = q.correctAnswers.sort().join(',');
//             const userAnswers = (userAnswer || []).sort().join(',');
//             if (correctAnswers === userAnswers) correct++;
//         }
//     });
//     return (correct / questions.length) * 100;
// };

// // ============================================================================
// // INITIAL DATA SETUP
// // ============================================================================

// const initializeData = () => {
//     if (!localStorage.getItem('quizData')) {
//         const initialData = {
//             students: [
//                 { id: 1, name: 'Alice Johnson', email: 'alice@student.com', groupId: 1 }
//             ],
//             teachers: [
//                 { id: 1, name: 'Dr. Smith', email: 'smith@teacher.com', subjectIds: [1] }
//             ],
//             subjects: [
//                 { id: 1, name: 'Mathematics', teacherId: 1 }
//             ],
//             groups: [
//                 { id: 1, name: 'Group A' }
//             ],
//             quizzes: [],
//             results: []
//         };
//         localStorage.setItem('quizData', JSON.stringify(initialData));
//     }
// };

// // ============================================================================
// // MAIN APP COMPONENT
// // ============================================================================

// const QuizApp = () => {
//     const [currentView, setCurrentView] = useState('home');
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         initializeData();
//         loadData();
//     }, []);

//     const loadData = () => {
//         const stored = localStorage.getItem('quizData');
//         setData(JSON.parse(stored));
//     };

//     const saveData = (newData) => {
//         localStorage.setItem('quizData', JSON.stringify(newData));
//         setData(newData);
//     };

//     if (!data) return <div style={styles.loading}>Loading...</div>;

//     return (
//         <div style={styles.app}>
//             {currentView === 'home' && (
//                 <HomePage setCurrentView={setCurrentView} />
//             )}
//             {currentView === 'student' && (
//                 <StudentInterface data={data} setCurrentView={setCurrentView} saveData={saveData} />
//             )}
//             {currentView === 'teacher' && (
//                 <TeacherInterface data={data} setCurrentView={setCurrentView} saveData={saveData} />
//             )}
//             {currentView === 'admin' && (
//                 <AdminInterface data={data} setCurrentView={setCurrentView} saveData={saveData} />
//             )}
//         </div>
//     );
// };

// // ============================================================================
// // HOME PAGE - Role Selection
// // ============================================================================

// const HomePage = ({ setCurrentView }) => {
//     return (
//         <div style={styles.homePage}>
//             <div style={styles.homeContainer}>
//                 <h1 style={styles.homeTitle}>Quiz Management System</h1>
//                 <p style={styles.homeSubtitle}>Select your role to continue</p>

//                 <div style={styles.roleButtons}>
//                     <button style={{ ...styles.roleButton, ...styles.studentButton }} onClick={() => setCurrentView('student')}>
//                         <div style={styles.roleIcon}>👨‍🎓</div>
//                         <div style={styles.roleLabel}>Student</div>
//                         <div style={styles.roleDesc}>Take quizzes</div>
//                     </button>

//                     <button style={{ ...styles.roleButton, ...styles.teacherButton }} onClick={() => setCurrentView('teacher')}>
//                         <div style={styles.roleIcon}>👨‍🏫</div>
//                         <div style={styles.roleLabel}>Teacher</div>
//                         <div style={styles.roleDesc}>Create & manage quizzes</div>
//                     </button>

//                     <button style={{ ...styles.roleButton, ...styles.adminButton }} onClick={() => setCurrentView('admin')}>
//                         <div style={styles.roleIcon}>👨‍💼</div>
//                         <div style={styles.roleLabel}>Admin</div>
//                         <div style={styles.roleDesc}>System management</div>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ============================================================================
// // STUDENT INTERFACE
// // ============================================================================

// const StudentInterface = ({ data, setCurrentView, saveData }) => {
//     const [quizKey, setQuizKey] = useState('');
//     const [error, setError] = useState('');
//     const [activeQuiz, setActiveQuiz] = useState(null);
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [answers, setAnswers] = useState([]);
//     const [selectedAnswer, setSelectedAnswer] = useState(null);
//     const [timeRemaining, setTimeRemaining] = useState(0);
//     const [quizCompleted, setQuizCompleted] = useState(false);
//     const [result, setResult] = useState(null);

//     // Timer effect
//     useEffect(() => {
//         if (activeQuiz && timeRemaining > 0 && !quizCompleted) {
//             const timer = setTimeout(() => {
//                 setTimeRemaining(timeRemaining - 1);
//             }, 1000);
//             return () => clearTimeout(timer);
//         } else if (timeRemaining === 0 && activeQuiz && !quizCompleted) {
//             handleQuizComplete();
//         }
//     }, [timeRemaining, activeQuiz, quizCompleted]);

//     const handleStartQuiz = () => {
//         const quiz = data.quizzes.find(q => q.key === quizKey);
//         if (!quiz) {
//             setError('Invalid quiz key. Please check and try again.');
//             return;
//         }

//         const now = new Date();
//         const openDate = new Date(quiz.openDate);
//         if (now < openDate) {
//             setError('This quiz is not yet available.');
//             return;
//         }

//         setError('');
//         setActiveQuiz(quiz);
//         setTimeRemaining(quiz.duration * 60);
//         setAnswers(new Array(quiz.questions.length).fill(null));
//     };

//     const handleAnswerSelect = (answer) => {
//         const question = activeQuiz.questions[currentQuestion];
//         if (question.type === 'QCU') {
//             setSelectedAnswer(answer);
//         } else {
//             // QCM - toggle checkbox
//             const current = selectedAnswer || [];
//             if (current.includes(answer)) {
//                 setSelectedAnswer(current.filter(a => a !== answer));
//             } else {
//                 setSelectedAnswer([...current, answer]);
//             }
//         }
//     };

//     const handleSubmitAnswer = () => {
//         const newAnswers = [...answers];
//         newAnswers[currentQuestion] = selectedAnswer;
//         setAnswers(newAnswers);

//         if (currentQuestion < activeQuiz.questions.length - 1) {
//             setCurrentQuestion(currentQuestion + 1);
//             setSelectedAnswer(null);
//         } else {
//             handleQuizComplete(newAnswers);
//         }
//     };

//     const handleQuizComplete = (finalAnswers = answers) => {
//         const score = calculateScore(finalAnswers, activeQuiz.questions);
//         const quizResult = {
//             id: Date.now(),
//             quizId: activeQuiz.id,
//             quizTitle: activeQuiz.subject,
//             answers: finalAnswers,
//             score: score,
//             date: new Date().toISOString()
//         };

//         setResult(quizResult);
//         setQuizCompleted(true);

//         // Save result
//         const newData = { ...data };
//         newData.results.push(quizResult);
//         saveData(newData);
//     };

//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return ${ mins }:${ secs.toString().padStart(2, '0') };
//     };

//     // Quiz entry screen
//     if (!activeQuiz) {
//         return (
//             <div style={styles.studentContainer}>
//                 <div style={styles.header}>
//                     <h2>Student Quiz Access</h2>
//                     <button style={styles.backButton} onClick={() => setCurrentView('home')}>
//                         ← Back
//                     </button>
//                 </div>

//                 <div style={styles.keyEntry}>
//                     <h3>Enter Quiz Key</h3>
//                     <input
//                         type="text"
//                         maxLength="6"
//                         value={quizKey}
//                         onChange={(e) => setQuizKey(e.target.value.replace(/\D/g, ''))}
//                         placeholder="000000"
//                         style={styles.keyInput}
//                     />
//                     {error && <div style={styles.error}>{error}</div>}
//                     <button
//                         style={styles.startButton}
//                         onClick={handleStartQuiz}
//                         disabled={quizKey.length !== 6}
//                     >
//                         Start Quiz
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Quiz completed - show results
//     if (quizCompleted && result) {
//         return (
//             <div style={styles.studentContainer}>
//                 <div style={styles.header}>
//                     <h2>Quiz Results</h2>
//                 </div>

//                 <div style={styles.resultsContainer}>
//                     <div style={styles.scoreDisplay}>
//                         <h3>Your Score</h3>
//                         <div style={styles.scoreValue}>{result.score.toFixed(1)}%</div>
//                     </div>

//                     <h3 style={styles.reviewTitle}>Answer Review</h3>
//                     {activeQuiz.questions.map((q, idx) => {
//                         const userAnswer = result.answers[idx];
//                         const isCorrect = q.type === 'QCU'
//                             ? userAnswer === q.correctAnswer
//                             : JSON.stringify((userAnswer || []).sort()) === JSON.stringify(q.correctAnswers.sort());

//                         return (
//                             <div key={idx} style={styles.reviewQuestion}>
//                                 <div style={styles.questionHeader}>
//                                     <span style={{ fontWeight: 'bold' }}>Q{idx + 1}:</span>
//                                     <span style={isCorrect ? styles.correctBadge : styles.incorrectBadge}>
//                                         {isCorrect ? '✓ Correct' : '✗ Incorrect'}
//                                     </span>
//                                 </div>
//                                 <div style={styles.questionText}>{q.text}</div>

//                                 {!isCorrect && (
//                                     <div style={styles.answerReview}>
//                                         <div style={styles.wrongAnswer}>
//                                             Your answer: {q.type === 'QCU' ? userAnswer : (userAnswer || []).join(', ')}
//                                         </div>
//                                         <div style={styles.correctAnswer}>
//                                             Correct answer: {q.type === 'QCU' ? q.correctAnswer : q.correctAnswers.join(', ')}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}

//                     <button style={styles.backButton} onClick={() => setCurrentView('home')}>
//                         Back to Home
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Active quiz taking interface
//     const question = activeQuiz.questions[currentQuestion];

//     return (
//         <div style={styles.quizContainer}>
//             {/* Left sidebar - Question navigator */}
//             <div style={styles.questionNav}>
//                 <div style={styles.timerDisplay}>
//                     <div style={styles.timerLabel}>Time Remaining</div>
//                     <div style={styles.timerValue}>{formatTime(timeRemaining)}</div>
//                 </div>

//                 <div style={styles.progressInfo}>
//                     <h4>Questions</h4>
//                     <div style={styles.questionGrid}>
//                         {activeQuiz.questions.map((_, idx) => (
//                             <div
//                                 key={idx}
//                                 style={{
//                                     ...styles.questionIndicator,
//                                     ...(idx === currentQuestion ? styles.currentIndicator : {}),
//                                     ...(answers[idx] !== null ? styles.answeredIndicator : {})
//                                 }}
//                             >
//                                 {idx + 1}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Right side - Current question */}
//             <div style={styles.questionDisplay}>
//                 <div style={styles.questionHeader}>
//                     <h3>Question {currentQuestion + 1} of {activeQuiz.questions.length}</h3>
//                     <span style={styles.questionType}>{question.type}</span>
//                 </div>

//                 <div style={styles.questionText}>{question.text}</div>

//                 <div style={styles.answersContainer}>
//                     {question.options.map((option, idx) => (
//                         <label key={idx} style={styles.answerOption}>
//                             {question.type === 'QCU' ? (
//                                 <input
//                                     type="radio"
//                                     name="answer"
//                                     checked={selectedAnswer === option}
//                                     onChange={() => handleAnswerSelect(option)}
//                                     style={styles.radioInput}
//                                 />
//                             ) : (
//                                 <input
//                                     type="checkbox"
//                                     checked={(selectedAnswer || []).includes(option)}
//                                     onChange={() => handleAnswerSelect(option)}
//                                     style={styles.checkboxInput}
//                                 />
//                             )}
//                             <span style={styles.optionText}>{option}</span>
//                         </label>
//                     ))}
//                 </div>

//                 <button
//                     style={styles.submitButton}
//                     onClick={handleSubmitAnswer}
//                     disabled={selectedAnswer === null || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
//                 >
//                     {currentQuestion < activeQuiz.questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// // ============================================================================
// // TEACHER INTERFACE
// // ============================================================================

// const TeacherInterface = ({ data, setCurrentView, saveData }) => {
//     const [selectedSubject, setSelectedSubject] = useState(null);
//     const [showQuizForm, setShowQuizForm] = useState(false);
//     const [numQuestions, setNumQuestions] = useState('');
//     const [questions, setQuestions] = useState([]);
//     const [duration, setDuration] = useState('');
//     const [openDate, setOpenDate] = useState('');
//     const [generatedKey, setGeneratedKey] = useState('');

//     const teacher = data.teachers[0]; // Demo: using first teacher
//     const teacherSubjects = data.subjects.filter(s => teacher.subjectIds.includes(s.id));

//     const handleStartQuizCreation = () => {
//         const num = parseInt(numQuestions);
//         if (num > 0 && num <= 50) {
//             const initialQuestions = Array.from({ length: num }, () => ({
//                 text: '',
//                 type: 'QCU',
//                 options: ['', '', '', ''],
//                 correctAnswer: '',
//                 correctAnswers: []
//             }));
//             setQuestions(initialQuestions);
//         }
//     };

//     const updateQuestion = (idx, field, value) => {
//         const updated = [...questions];
//         updated[idx][field] = value;
//         setQuestions(updated);
//     };

//     const updateOption = (qIdx, oIdx, value) => {
//         const updated = [...questions];
//         updated[qIdx].options[oIdx] = value;
//         setQuestions(updated);
//     };

//     const handleSaveQuiz = () => {
//         // Validate
//         const allValid = questions.every(q =>
//             q.text &&
//             q.options.every(o => o) &&
//             (q.type === 'QCU' ? q.correctAnswer : q.correctAnswers.length > 0)
//         );

//         if (!allValid || !duration || !openDate) {
//             alert('Please fill all fields correctly');
//             return;
//         }

//         const key = generateQuizKey();
//         const newQuiz = {
//             id: Date.now(),
//             key,
//             subject: selectedSubject.name,
//             subjectId: selectedSubject.id,
//             questions,
//             duration: parseInt(duration),
//             openDate,
//             createdAt: new Date().toISOString()
//         };

//         const newData = { ...data };
//         newData.quizzes.push(newQuiz);
//         saveData(newData);

//         setGeneratedKey(key);
//         setShowQuizForm(false);
//         setNumQuestions('');
//         setQuestions([]);
//         setDuration('');
//         setOpenDate('');
//     };

//     return (
//         <div style={styles.teacherContainer}>
//             <div style={styles.header}>
//                 <h2>Teacher Dashboard</h2>
//                 <button style={styles.backButton} onClick={() => setCurrentView('home')}>
//                     ← Back
//                 </button>
//             </div>

//             {generatedKey && (
//                 <div style={styles.keyDisplay}>
//                     <h3>✅ Quiz Created Successfully!</h3>
//                     <div style={styles.generatedKey}>
//                         <span>Quiz Key:</span>
//                         <strong>{generatedKey}</strong>
//                     </div>
//                     <p>Share this key with your students</p>
//                     <button style={styles.closeButton} onClick={() => setGeneratedKey('')}>Close</button>
//                 </div>
//             )}

//             {!selectedSubject && (
//                 <div style={styles.subjectList}>
//                     <h3>Your Subjects</h3>
//                     {teacherSubjects.map(subject => (
//                         <div key={subject.id} style={styles.subjectCard} onClick={() => setSelectedSubject(subject)}>
//                             <h4>{subject.name}</h4>
//                             <div style={styles.quizCount}>
//                                 {data.quizzes.filter(q => q.subjectId === subject.id).length} quizzes
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {selectedSubject && !showQuizForm && questions.length === 0 && (
//                 <div style={styles.subjectView}>
//                     <button style={styles.backButton} onClick={() => setSelectedSubject(null)}>
//                         ← Back to Subjects
//                     </button>
//                     <h3>{selectedSubject.name}</h3>

//                     <div style={styles.quizList}>
//                         <h4>Existing Quizzes</h4>
//                         {data.quizzes.filter(q => q.subjectId === selectedSubject.id).map(quiz => (
//                             <div key={quiz.id} style={styles.quizItem}>
//                                 <div>
//                                     <strong>Key: {quiz.key}</strong>
//                                     <div style={styles.quizMeta}>
//                                         {quiz.questions.length} questions • {quiz.duration} minutes
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <button style={styles.addQuizButton} onClick={() => setShowQuizForm(true)}>
//                         + Add New Quiz
//                     </button>
//                 </div>
//             )}

//             {showQuizForm && questions.length === 0 && (
//                 <div style={styles.quizForm}>
//                     <h3>Create New Quiz</h3>
//                     <label style={styles.formLabel}>
//                         Number of Questions:
//                         <input
//                             type="number"
//                             min="1"
//                             max="50"
//                             value={numQuestions}
//                             onChange={(e) => setNumQuestions(e.target.value)}
//                             style={styles.input}
//                         />
//                     </label>
//                     <button style={styles.button} onClick={handleStartQuizCreation}>
//                         Generate Question Forms
//                     </button>
//                     <button style={styles.cancelButton} onClick={() => setShowQuizForm(false)}>
//                         Cancel
//                     </button>
//                 </div>
//             )}

//             {questions.length > 0 && (
//                 <div style={styles.questionForms}>
//                     <h3>Configure Questions</h3>

//                     {questions.map((q, qIdx) => (
//                         <div key={qIdx} style={styles.questionForm}>
//                             <h4>Question {qIdx + 1}</h4>

//                             <label style={styles.formLabel}>
//                                 Question Text:
//                                 <textarea
//                                     value={q.text}
//                                     onChange={(e) => updateQuestion(qIdx, 'text', e.target.value)}
//                                     style={styles.textarea}
//                                 />
//                             </label>

//                             <label style={styles.formLabel}>
//                                 Type:
//                                 <select
//                                     value={q.type}
//                                     onChange={(e) => updateQuestion(qIdx, 'type', e.target.value)}
//                                     style={styles.select}
//                                 >
//                                     <option value="QCU">QCU (Single Choice)</option>
//                                     <option value="QCM">QCM (Multiple Choice)</option>
//                                 </select>
//                             </label>

//                             <div style={styles.optionsContainer}>
//                                 {q.options.map((opt, oIdx) => (
//                                     <div key={oIdx} style={styles.optionInput}>
//                                         <input
//                                             type="text"
//                                             value={opt}
//                                             onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
//                                             placeholder={Option ${oIdx + 1}}
//                                         style={styles.input}
//                     />
//                                         {q.type === 'QCU' ? (
//                                             <input
//                                                 type="radio"
//                                                 name={correct - ${qIdx}}
//                                         checked={q.correctAnswer === opt}
//                                         onChange={() => updateQuestion(qIdx, 'correctAnswer', opt)}
//                       />
//                                         ) : (
//                                         <input
//                                             type="checkbox"
//                                             checked={q.correctAnswers.includes(opt)}
//                                             onChange={(e) => {
//                                                 const updated = e.target.checked
//                                                     ? [...q.correctAnswers, opt]
//                                                     : q.correctAnswers.filter(a => a !== opt);
//                                                 updateQuestion(qIdx, 'correctAnswers', updated);
//                                             }}
//                                         />
//                     )}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}

//                     <div style={styles.quizSettings}>
//                         <label style={styles.formLabel}>
//                             Quiz Duration (minutes):
//                             <input
//                                 type="number"
//                                 value={duration}
//                                 onChange={(e) => setDuration(e.target.value)}
//                                 style={styles.input}
//                             />
//                         </label>

//                         <label style={styles.formLabel}>
//                             Opening Date:
//                             <input
//                                 type="datetime-local"
//                                 value={openDate}
//                                 onChange={(e) => setOpenDate(e.target.value)}
//                                 style={styles.input}
//                             />
//                         </label>
//                     </div>

//                     <button style={styles.saveButton} onClick={handleSaveQuiz}>
//                         Save Quiz & Generate Key
//                     </button>
//                     <button style={styles.cancelButton} onClick={() => {
//                         setQuestions([]);
//                         setShowQuizForm(false);
//                     }}>
//                         Cancel
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// // ============================================================================
// // ADMIN INTERFACE
// // ============================================================================

// const AdminInterface = ({ data, setCurrentView, saveData }) => {
//     const [activeTab, setActiveTab] = useState('students');
//     const [showForm, setShowForm] = useState(false);
//     const [formData, setFormData] = useState({});

//     const tabs = ['students', 'teachers', 'subjects', 'groups'];

//     const handleCreate = (type) => {
//         const newData = { ...data };
//         const newId = Math.max(0, ...newData[type].map(item => item.id)) + 1;

//         const newItem = { id: newId, ...formData };
//         newData[type].push(newItem);
//         saveData(newData);
//         setShowForm(false);
//         setFormData({});
//     };

//     const handleDelete = (type, id) => {
//         const newData = { ...data };
//         newData[type] = newData[type].filter(item => item.id !== id);
//         saveData(newData);
//     };

//     const renderForm = () => {
//         switch (activeTab) {
//             case 'students':
//                 return (
//                     <div style={styles.form}>
//                         <input
//                             placeholder="Name"
//                             value={formData.name || ''}
//                             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                             style={styles.input}
//                         />
//                         <input
//                             placeholder="Email"
//                             value={formData.email || ''}
//                             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                             style={styles.input}
//                         />
//                         <select
//                             value={formData.groupId || ''}
//                             onChange={(e) => setFormData({ ...formData, groupId: parseInt(e.target.value) })}
//                             style={styles.select}
//                         >
//                             <option value="">Select Group</option>
//                             {data.groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
//                         </select>
//                     </div>
//                 );
//             case 'teachers':
//                 return (
//                     <div style={styles.form}>
//                         <input
//                             placeholder="Name"
//                             value={formData.name || ''}
//                             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                             style={styles.input}
//                         />
//                         <input
//                             placeholder="Email"
//                             value={formData.email || ''}
//                             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                             style={styles.input}
//                         />
//                     </div>
//                 );
//             case 'subjects':
//                 return (
//                     <div style={styles.form}>
//                         <input
//                             placeholder="Subject Name"
//                             value={formData.name || ''}
//                             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                             style={styles.input}
//                         />
//                         <select
//                             value={formData.teacherId || ''}
//                             onChange={(e) => setFormData({ ...formData, teacherId: parseInt(e.target.value) })}
//                             style={styles.select}
//                         >
//                             <option value="">Assign Teacher</option>
//                             {data.teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
//                         </select>
//                     </div>
//                 );
//             case 'groups':
//                 return (
//                     <div style={styles.form}>
//                         <input
//                             placeholder="Group Name"
//                             value={formData.name || ''}
//                             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                             style={styles.input}
//                         />
//                     </div>
//                 );
//         }
//     };

//     const renderTable = () => {
//         const items = data[activeTab];
//         return (
//             <table style={styles.table}>
//                 <thead>
//                     <tr>
//                         <th style={styles.th}>ID</th>
//                         <th style={styles.th}>Name</th>
//                         {activeTab === 'students' && <th style={styles.th}>Group</th>}
//                         {activeTab === 'subjects' && <th style={styles.th}>Teacher</th>}
//                         <th style={styles.th}>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {items.map(item => (
//                         <tr key={item.id}>
//                             <td style={styles.td}>{item.id}</td>
//                             <td style={styles.td}>{item.name}</td>
//                             {activeTab === 'students' && (
//                                 <td style={styles.td}>
//                                     {data.groups.find(g => g.id === item.groupId)?.name || 'N/A'}
//                                 </td>
//                             )}
//                             {activeTab === 'subjects' && (
//                                 <td style={styles.td}>
//                                     {data.teachers.find(t => t.id === item.teacherId)?.name || 'N/A'}
//                                 </td>
//                             )}
//                             <td style={styles.td}>
//                                 <button
//                                     style={styles.deleteButton}
//                                     onClick={() => handleDelete(activeTab, item.id)}
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         );
//     };

//     return (
//         <div style={styles.adminContainer}>
//             <div style={styles.header}>
//                 <h2>Admin Dashboard</h2>
//                 <button style={styles.backButton} onClick={() => setCurrentView('home')}>
//                     ← Back
//                 </button>
//             </div>

//             <div style={styles.tabs}>
//                 {tabs.map(tab => (
//                     <button
//                         key={tab}
//                         style={{ ...styles.tab, ...(activeTab === tab ? styles.activeTab : {}) }}
//                         onClick={() => {
//                             setActiveTab(tab);
//                             setShowForm(false);
//                             setFormData({});
//                         }}
//                     >
//                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </button>
//                 ))}
//             </div>

//             <div style={styles.adminContent}>
//                 <button style={styles.addButton} onClick={() => setShowForm(!showForm)}>
//                     + Add {activeTab.slice(0, -1)}
//                 </button>

//                 {showForm && (
//                     <div style={styles.formContainer}>
//                         {renderForm()}
//                         <div style={styles.formActions}>
//                             <button style={styles.saveButton} onClick={() => handleCreate(activeTab)}>
//                                 Save
//                             </button>
//                             <button style={styles.cancelButton} onClick={() => setShowForm(false)}>
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {renderTable()}
//             </div>
//         </div>
//     );
// };

// // ============================================================================
// // STYLES
// // ============================================================================

// const styles = {
//     app: {
//         minHeight: '100vh',
//         backgroundColor: '#f5f7fa',
//         fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//     },
//     loading: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         fontSize: '20px',
//         color: '#666',
//     },

//     // Home Page
//     homePage: {
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     },
//     homeContainer: {
//         textAlign: 'center',
//         color: 'white',
//     },
//     homeTitle: {
//         fontSize: '48px',
//         marginBottom: '10px',
//         fontWeight: '700',
//     },
//     homeSubtitle: {
//         fontSize: '18px',
//         marginBottom: '50px',
//         opacity: 0.9,
//     },
//     roleButtons: {
//         display: 'flex',
//         gap: '30px',
//         justifyContent: 'center',
//     },
//     roleButton: {
//         backgroundColor: 'white',
//         border: 'none',
//         borderRadius: '16px',
//         padding: '40px 30px',
//         cursor: 'pointer',
//         transition: 'transform 0.2s, box-shadow 0.2s',
//         minWidth: '200px',
//     },
//     roleIcon: {
//         fontSize: '64px',
//         marginBottom: '15px',
//     },
//     roleLabel: {
//         fontSize: '24px',
//         fontWeight: '600',
//         color: '#333',
//         marginBottom: '8px',
//     },
//     roleDesc: {
//         fontSize: '14px',
//         color: '#666',
//     },

//     // Student Interface
//     studentContainer: {
//         padding: '30px',
//         maxWidth: '600px',
//         margin: '0 auto',
//     },
//     header: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '30px',
//     },
//     backButton: {
//         padding: '10px 20px',
//         backgroundColor: '#6c757d',
//         color: 'white',
//         border: 'none',
//         borderRadius: '8px',
//         cursor: 'pointer',
//     },
//     keyEntry: {
//         backgroundColor: 'white',
//         padding: '40px',
//         borderRadius: '16px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//         textAlign: 'center',
//     },
//     keyInput: {
//         fontSize: '32px',
//         padding: '15px',
//         width: '100%',
//         maxWidth: '300px',
//         textAlign: 'center',
//         border: '2px solid #ddd',
//         borderRadius: '8px',
//         margin: '20px 0',
//         letterSpacing: '8px',
//     },
//     error: {
//         color: '#dc3545',
//         marginTop: '10px',
//         fontSize: '14px',
//     },
//     startButton: {
//         padding: '15px 40px',
//         backgroundColor: '#667eea',
//         color: 'white',
//         border: 'none',
//         borderRadius: '8px',
//         fontSize: '18px',
//         cursor: 'pointer',
//         marginTop: '20px',
//     },

//     // Quiz Taking Interface
//     quizContainer: {
//         display: 'flex',
//         height: '100vh',
//     },
//     questionNav: {
//         width: '25%',
//         backgroundColor: '#2c3e50',
//         color: 'white',
//         padding: '30px',
//         overflowY: 'auto',
//     },
//     timerDisplay: {
//         backgroundColor: '#34495e',
//         padding: '20px',
//         borderRadius: '12px',
//         marginBottom: '30px',
//         textAlign: 'center',
//     },
//     timerLabel: {
//         fontSize: '14px',
//         opacity: 0.8,
//         marginBottom: '8px',
//     },
//     timerValue: {
//         fontSize: '32px',
//         fontWeight: '700',
//     },
//     progressInfo: {
//         marginTop: '30px',
//     },
//     questionGrid: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(5, 1fr)',
//         gap: '10px',
//         marginTop: '15px',
//     },
//     questionIndicator: {
//         width: '40px',
//         height: '40px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: '8px',
//         backgroundColor: '#95a5a6',
//         fontWeight: '600',
//     },
//     currentIndicator: {
//         backgroundColor: '#3498db',
//         border: '2px solid white',
//     },
//     answeredIndicator: {
//         backgroundColor: '#27ae60',
//     },
//     questionDisplay: {
//         width: '75%',
//         padding: '40px',
//         overflowY: 'auto',
//     },
//     questionHeader: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '30px',
//     },
//     questionType: {
//         padding: '8px 16px',
//         backgroundColor: '#e9ecef',
//         borderRadius: '20px',
//         fontSize: '14px',
//         fontWeight: '600',
//     },
//     questionText: {
//         fontSize: '24px',
//         marginBottom: '30px',
//         lineHeight: '1.6',
//     },
//     answersContainer: {
//         marginBottom: '40px',
//     },
//     answerOption: {
//         display: 'flex',
//         alignItems: 'center',
//         padding: '20px',
//         backgroundColor: 'white',
//         borderRadius: '12px',
//         marginBottom: '15px',
//         cursor: 'pointer',
//         border: '2px solid #e9ecef',
//         transition: 'all 0.2s',
//     },
//     radioInput: {
//         marginRight: '15px',
//         width: '20px',
//         height: '20px',
//         cursor: 'pointer',
//     },
//     checkboxInput: {
//         marginRight: '15px',
//         width: '20px',
//         height: '20px',
//         cursor: 'pointer',
//     },
//     optionText: {
//         fontSize: '18px',
//     },
//     submitButton: {
//         padding: '15px 40px',
//         backgroundColor: '#667eea',
//         color: 'white',
//         border: 'none',
//         borderRadius: '8px',
//         fontSize: '18px',
//         cursor: 'pointer',
//         width: '100%',
//     },

//     // Results
//     resultsContainer: {
//         backgroundColor: 'white',
//         padding: '40px',
//         borderRadius: '16px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//     },
//     scoreDisplay: {
//         textAlign: 'center',
//         padding: '30px',
//         backgroundColor: '#f8f9fa',
//         borderRadius: '12px',
//         marginBottom: '40px',
//     },
//     scoreValue: {
//         fontSize: '64px',
//         fontWeight: '700',
//         color: '#667eea',
//     },
//     reviewTitle: {
//         marginBottom: '20px',
//         borderBottom: '2px solid #e9ecef',
//         paddingBottom: '10px',
//     },
//     reviewQuestion: {
//         marginBottom: '30px',
//         padding: '20px',
//         backgroundColor: '#f8f9fa',
//         borderRadius: '12px',
//     },
//     correctBadge: {
//         padding: '4px 12px',
//         backgroundColor: '#d4edda',
//         color: '#155724',
//         borderRadius: '12px',
//         fontSize: '14px',
//     },
//     incorrectBadge: {
//         padding: '4px 12px',
//         backgroundColor: '#f8d7da',
//         color: '#721c24',
//         borderRadius: '12px',
//         fontSize: '14px',
//     },
//     answerReview: {
//         marginTop: '15px',
//     },
//     wrongAnswer: {
//         color: '#dc3545',
//         padding: '10px',
//         backgroundColor: '#f8d7da',
//         borderRadius: '8px',
//         marginBottom: '10px',
//     },
//     correctAnswer: {
//         color: '#28a745',
//         padding: '10px',
//         backgroundColor: '#d4edda',
//         borderRadius: '8px',
//     },

//     // Teacher Interface
//     teacherContainer: {
//         padding: '30px',
//         maxWidth: '1200px',
//         margin: '0 auto',
//     },
//     keyDisplay: {
//         backgroundColor: '#d4edda',
//         padding: '30px',
//         borderRadius: '16px',
//         marginBottom: '30px',
//         textAlign: 'center',
//     },
//     generatedKey: {
//         fontSize: '48px',
//         fontWeight: '700',
//         color: '#155724',
//         margin: '20px 0',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '20px',
//     },
//     closeButton: {
//         padding: '10px 30px',
//         backgroundColor: '#28a745',
//         color: 'white',
//         border: 'none',
//         borderRadius: '8px',
//         cursor: 'pointer',
//         marginTop: '10px',
//     },
//     subjectList: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//         gap: '20px',
//     },
//     subjectCard: {
//         backgroundColor: 'white',
//         padding: '30px',
//         borderRadius: '16px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//         cursor: 'pointer',
//         transition: 'transform 0.2s',
//     },
//     quizCount: {
//         marginTop: '10px',
//         color: '#666',
//         fontSize: '14px',
//     },
//     subjectView: {
//         backgroundColor: 'white',
//         padding: '30px',
//         borderRadius: '16px',
//     },
//     quizList: {
//         marginTop: '30px',
//     },
//     quizItem: {
//         padding: '20px',
//         backgroundColor: '#f8f9fa',
//         borderRadius: '12px',
//         marginBottom: '15px',
//     },
//     quizMeta: {
//         fontSize: '14px',
//         color: '#666',
//         marginTop: '5px',
//     },
//     addQuizButton: {
//         padding: '15px 30px',
//         backgroundColor: '#667eea',
//         color: 'white',
//         border: 'none',
//         borderRadius: '8px',
//         cursor: 'pointer',
//         marginTop: '20px',
//     },
//     quizForm: {
//         backgroundColor: 'white',
//         padding: '30px',
//         borderRadius: '16px',
//     },
//     formLabel: {
//         display: 'block',
//         marginBottom: '20px',
//         fontSize: '16px',
//         fontWeight: '600',
//     },
//     input: {
//         width: '100%',
//         padding: '12px',
//         fontSize: '16px',
//         border: '2px solid #e9ecef',
//         borderRadius: '8px',
//         marginTop: '8px',
//     },
//     button: {
//         padding: '12px 24px',
//         backgroundColor: '#667eea',
//         color: 'white',
//         border: 'none',
//         borderRadius: '8px',
//         cursor: 'pointer',
//         marginRight: '10px',
//     },
//     cancelButton: {
//         padding: '12px 24px',
//         backgroundColor: '#6c757d',
//         color: 'white',
//         border: 'none',
//         borderRadius: '8px',
//         cursor: 'pointer',
//     },
//     questionForms: {
//         backgroundColor: 'white',
//         padding: '30px',
//         borderRadius: '16px',
//     },
//     questionForm: {
//         padding: '20px',
//         backgroundColor: '#f8f9fa',
//         borderRadius: '12px',
//         marginBottom: '20px',
//     },
//     textarea: {
//         width: '100%',
//         padding: '12px',
//         fontSize: '16px',
//         border: '2px solid #e9ecef',
//         borderRadius: '8px',
//         marginTop: '8px',
//         minHeight: '100px',
//         fontFamily: 'inherit',
//     },
//     select: {
//         width: '100%',
//         padding: '12px',
//         fontSize: '16px',
//         border: '2px solid #e9ecef',
//         borderRadius: '8px',
//         marginTop: '8px',
//         backgroundColor: 'white',
//     },
//     optionsContainer: {
//         marginTop: '15px',
//     },
//     optionInput: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '10px',
//         marginBottom: '10px',
//     },
//     quizSettings: {
//         padding: '20px',
//         backgroundColor: '#fff3cd',
//         borderRadius: '12px',
//         marginTop: '30px',
//     },
//     saveButton: {
//         padding: '15px 40px',
//         backgroundColor: '#28a745',
//         color: 'white',
//         border: 'none',
//         borderRadius: '8px',
//         fontSize: '18px',
//         cursor: 'pointer',
//         marginTop: '20px',
//         marginRight: '10px',
//     },

//     // Admin Interface
//     adminContainer: {
//         padding: '30px',
//         maxWidth: '1200px',
//         margin: '0 auto',
//     },
//     tabs: {
//         display: 'flex',
//         gap: '10px',
//         marginBottom: '30px',
//         borderBottom: '2px solid #e9ecef',
//     },
//     tab: {
//         padding: '15px 30px',
//         backgroundColor: 'transparent',
//         border: 'none',
//         cursor: 'pointer',
//         fontSize: '16px',
//         fontWeight: '600',
//         color: '#6c757d',
//         borderBottom: '3px solid transparent',
//     },
//     activeTab: {
//         color: '#667eea',
//         borderBottom: '3px solid #667eea',
//     },
//     adminContent: {
//         backgroundColor: 'white',
//         padding: '30px',
//         borderRadius: '16px',
//     },
//     addButton: {
//         padding: '12px 24px',
//         backgroundColor: '#667eea',
//         color: 'white',
//         border: 'none',
//         borderRadius: '8px',
//         cursor: 'pointer',
//         marginBottom: '20px',
//     },
//     formContainer: {
//         padding: '20px',
//         backgroundColor: '#f8f9fa',
//         borderRadius: '12px',
//         marginBottom: '30px',
//     },
//     form: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '15px',
//     },
//     formActions: {
//         display: 'flex',
//         gap: '10px',
//         marginTop: '20px',
//     },
//     table: {
//         width: '100%',
//         borderCollapse: 'collapse',
//     },
//     th: {
//         padding: '15px',
//         textAlign: 'left',
//         backgroundColor: '#f8f9fa',
//         fontWeight: '600',
//         borderBottom: '2px solid #e9ecef',
//     },
//     td: {
//         padding: '15px',
//         borderBottom: '1px solid #e9ecef',
//     },
//     deleteButton: {
//         padding: '8px 16px',
//         backgroundColor: '#dc3545',
//         color: 'white',
//         border: 'none',
//         borderRadius: '6px',
//         cursor: 'pointer',
//     },
// };

// export default QuizApp;