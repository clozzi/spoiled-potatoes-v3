from faker import Faker
from random import randint, choice as rc

from app import app
from models import db, Media, User, Review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print('Deleting...')
        Review.query.delete()
        Media.query.delete()
        User.query.delete()

        medias = []
        media_types = ['Movie', 'Series']
        platforms = ['HBO', 'Hulu', 'Netflix', 'Prime', 'Peacock']
        users = []
        reviews = []

        for i in range(15):
            media = Media(
                media_type = rc(media_types),
                streaming_platform = rc(platforms),
                title = fake.unique.name(),
                image_url = 'https://cdn.pixabay.com/photo/2017/03/15/21/17/potato-2147541_640.png',
            )

            medias.append(media)

        print('Creating Medias...')
        db.session.add_all(medias)

        for i in range(5):
            user = User(
                username = fake.unique.first_name(),
            )
            user.password_hash='123'
            users.append(user)
        
        print('Creating Users...')
        db.session.add_all(users)

        for i in range(20):
            review = Review(
                rating=randint(1,10),
                comment=fake.sentence()
            )
            review.user = rc(users)
            review.media = rc(medias)

            reviews.append(review)
        
        print('Creating Reviews...')
        db.session.add_all(reviews)

        db.session.commit()
        print('Seed Complete')