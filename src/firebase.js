import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  orderBy,
  query,
} from 'firebase/firestore/lite'

const firebaseConfig = {
  // firebase 설정과 관련된 개인 정보
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

// firebaseConfig 정보로 firebase 시작
const app = initializeApp(firebaseConfig)

// firebase의 firestore 인스턴스를 변수에 저장
const db = getFirestore(app)

export async function getComments(nickname) {
  const comments = doc(db, 'comments', nickname)
  const commentsSnapshot = await getDoc(comments)

  if (!commentsSnapshot.exists()) {
    return null
  }

  return commentsSnapshot.data()
}

export async function addComment(nickname, comment) {
  const commentRef = doc(db, 'comments', nickname)
  setDoc(commentRef, comment, { merge: true })
}
