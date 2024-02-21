from faker import Faker
from random import randint, choice as rc

from app import app
from models import db, Media, User, Review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print('Deleting...')
        Media.query.delete()
        User.query.delete()
        Review.query.delete()

        medias = []
        users = []
        reviews = []

        for i in range(15):
            media = Media(
                media_type = 'Movie',
                streaming_platform = 'HBO',
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