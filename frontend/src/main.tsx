import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import ProfessorHome from "./pages/ProfessorHome/ProfessorHome";
import TelaNotasProfessor from "./pages/TelaNotasProfessor/TelaNotasProfessor";
import TelaObservacoesProfessor from "./pages/TelaObservacoesProfessor/TelaObservacoesProfessor";
import Cadastro from "./pages/Cadastro/Cadastro";
import NotasAluno from "./pages/NotasAluno/NotasAluno";
import ObservacoesAluno from "./pages/ObservacoesAluno/ObservacoesAluno";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/professor" element={<ProfessorHome />} />
        <Route
          path="/professor/aluno/:matricula/notas"
          element={<TelaNotasProfessor />}
        />
        <Route
          path="/professor/aluno/:matricula/observacoes"
          element={<TelaObservacoesProfessor />}
        />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/aluno/:matricula/notas" element={<NotasAluno />} />
        <Route
          path="/aluno/:matricula/observacoes"
          element={<ObservacoesAluno />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

