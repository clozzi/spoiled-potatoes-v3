from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)

    reviews = db.relationship('Review', back_populates='user')

    serialize_rules = ('-reviews.user', '-_password_hash',)

    @hybrid_property
    def password_hash(self):
        raise AttributeError("No peeking!")
    
    @password_hash.setter
    def password_hash(self, password):
        new_hashed_password = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = new_hashed_password.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<User {self.username}>'
    

class Media(db.Model, SerializerMixin):
    __tablename__ = 'medias'

    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.String)
    streaming_platform = db.Column(db.String)
    title = db.Column(db.String)
    image_url = db.Column(db.String)

    reviews = db.relationship('Review', back_populates='media')

    serialize_rules = ('-reviews.media',)

    @validates('media_type')
    def validate_type(self, key, media_type):
        media_types = ['Movie', 'Series']

        if media_type not in media_types:
            raise ValueError('Media Type must be Movie or Series')
        return media_type
    
    @validates('streaming_platform')
    def validate_streaming(self, key, platform):
        platforms = ['HBO', 'Max', 'Hulu', 'Netflix', 'Prime', 'Peacock']

        if platform not in platforms:
            raise ValueError('Must be one of the big 5')
        return platform
    
    @validates('title')
    def validate_title(self, key, title):
        if not (1 <= len(title) <= 32):
            raise ValueError('Incorrect title length')
        return title

    def __repr__(self):
        return f'<Media {self.title}, Type: {self.media_type}, Platform: {self.streaming_platform}'
    

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    media_id = db.Column(db.Integer, db.ForeignKey('medias.id'))

    user = db.relationship('User', back_populates="reviews")
    media = db.relationship('Media', back_populates="reviews")

    serialize_rules = ('-user.reviews', '-media.reviews',)

    @validates('rating')
    def validate_rating(self, key, rating):
        if not (0 <= rating <= 10):
            raise ValueError('Invalid rating')
        return rating

    def __repr__(self):
        return f'<Review {self.id}: {self.rating} {self.comment}>'