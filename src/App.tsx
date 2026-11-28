import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout, FocusLayout } from '@/components/layout/AppLayout'
import { AuthProvider } from '@/contexts/AuthContext'
import AdminDashboardPage from '@/pages/AdminDashboardPage'
import CardPage from '@/pages/CardPage'
import CompaniesPage from '@/pages/CompaniesPage'
import CompanyDetailPage from '@/pages/CompanyDetailPage'
import CareerDetailPage from '@/pages/CareerDetailPage'
import CareersPage from '@/pages/CareersPage'
import DiagnosisPage from '@/pages/DiagnosisPage'
import ForUniversitiesPage from '@/pages/ForUniversitiesPage'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import MyPage from '@/pages/MyPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ResultPage from '@/pages/ResultPage'
import StaticPage from '@/pages/StaticPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<FocusLayout />}>
            <Route path="/diagnosis" element={<DiagnosisPage />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/result/:id" element={<ResultPage />} />
            <Route path="/card/:id" element={<CardPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/:id" element={<CareerDetailPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/companies/:id" element={<CompanyDetailPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/for-universities" element={<ForUniversitiesPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/about" element={<StaticPage page="about" />} />
            <Route path="/terms" element={<StaticPage page="terms" />} />
            <Route path="/privacy" element={<StaticPage page="privacy" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
