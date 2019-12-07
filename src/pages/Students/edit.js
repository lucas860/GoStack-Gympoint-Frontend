import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import api from '~/services/api';

import ContentHeader from '~/components/ContentHeader';

import {
  Container,
  BackButton,
  SaveButton,
  Card,
  CardInput,
  Line,
} from '~/pages/_layouts/default/styles';

export default function StudentUpdate({ match }) {
  const [student, setStudent] = useState();

  useEffect(() => {
    async function loadFormData() {
      const response = await api.get(`student/${match.params.student_id}`);

      setStudent(response.data);
    }

    loadFormData();
  }, []);

  async function handleSubmit({ name, email, idade, peso, altura }) {
    console.tron.log(name, email, idade, peso, altura);
    try {
      const response = await api.put(`/student/${match.params.student_id}`, {
        name,
        email,
        idade,
        peso,
        altura,
      });

      toast.success('Cadastro atualizado com sucesso!');

      setStudent(response.data);
    } catch (err) {
      toast.error('Falha ao atualizar o cadastro deste usuário!');
    }
  }

  return (
    <Container>
      <ContentHeader>
        <h1>Edição de aluno</h1>
        <div>
          <BackButton to="/">VOLTAR</BackButton>

          <SaveButton form="student" type="submit">
            SALVAR
          </SaveButton>
        </div>
      </ContentHeader>

      <Card id="student" initialData={student} onSubmit={handleSubmit}>
        <strong>NOME COMPLETO</strong>
        <CardInput name="name" type="name" />

        <strong>ENDEREÇO DE EMAIL</strong>
        <CardInput name="email" type="email" />

        <Line>
          <div>
            <strong>IDADE</strong>
            <CardInput name="idade" type="number" />
          </div>
          <div className="block">
            <strong>PESO (em kg)</strong>
            <CardInput
              name="peso"
              step={0.1}
              type="number"
              placeholder="00,0"
            />
          </div>

          <div className="block">
            <strong>ALTURA</strong>
            <CardInput
              name="altura"
              step={0.01}
              type="number"
              placeholder="0,00"
            />
          </div>
        </Line>
      </Card>
    </Container>
  );
}

StudentUpdate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      student_id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};