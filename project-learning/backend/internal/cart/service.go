package cart

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Add(userId, productId, qty uint) error {
	return s.repo.Add(userId, productId, qty)
}

func (s *Service) List(userId uint) ([]CartItem, error) {
	return s.repo.List(userId)
}
