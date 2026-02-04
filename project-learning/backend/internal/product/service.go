package product

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Create(p *Product) error {
	return s.repo.Create(p)
}

func (s *Service) List() ([]Product, error) {
	return s.repo.FindAll()
}
