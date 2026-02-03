package user

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) SignUp(email, password string) error {
	_, err := s.repo.FindByEmail(email)
	if err == nil {
		return errors.New("email already exists")
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	if err != nil {
		return err
	}

	user := &User{
		Email:    email,
		Password: string(hashed),
	}

	return s.repo.Create(user)
}
