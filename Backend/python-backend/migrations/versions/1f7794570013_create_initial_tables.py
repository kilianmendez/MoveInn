"""create initial tables

Revision ID: 1f7794570013
Revises: 
Create Date: 2025-07-03 14:00:30.242277

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1f7794570013'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('forums',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('country', sa.String(), nullable=False),
    sa.Column('category', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('created_by', sa.String(length=36), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_forums_id'), 'forums', ['id'], unique=False)
    op.create_table('specialities',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_specialities_id'), 'specialities', ['id'], unique=False)
    op.create_table('users',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=True),
    sa.Column('mail', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('role', sa.String(), nullable=True),
    sa.Column('biography', sa.String(), nullable=True),
    sa.Column('avatar_url', sa.String(), nullable=True),
    sa.Column('school', sa.String(), nullable=True),
    sa.Column('degree', sa.String(), nullable=True),
    sa.Column('nationality', sa.String(), nullable=True),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('erasmus_country', sa.String(), nullable=True),
    sa.Column('erasmus_date', sa.DateTime(), nullable=True),
    sa.Column('phone', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_index(op.f('ix_users_mail'), 'users', ['mail'], unique=True)
    op.create_table('accommodations',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('country', sa.String(), nullable=True),
    sa.Column('price_per_month', sa.Numeric(), nullable=True),
    sa.Column('number_of_rooms', sa.Integer(), nullable=True),
    sa.Column('bathrooms', sa.Integer(), nullable=True),
    sa.Column('square_meters', sa.Integer(), nullable=True),
    sa.Column('has_wifi', sa.Boolean(), nullable=True),
    sa.Column('available_from', sa.DateTime(), nullable=True),
    sa.Column('available_to', sa.DateTime(), nullable=True),
    sa.Column('owner_id', sa.String(length=36), nullable=False),
    sa.Column('accommodation_type', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_accommodations_id'), 'accommodations', ['id'], unique=False)
    op.create_table('events',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('location', sa.String(), nullable=True),
    sa.Column('address', sa.String(), nullable=True),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('country', sa.String(), nullable=True),
    sa.Column('attendees_count', sa.Integer(), nullable=True),
    sa.Column('max_attendees', sa.Integer(), nullable=True),
    sa.Column('category', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('image_url', sa.String(), nullable=True),
    sa.Column('tags', sa.String(), nullable=True),
    sa.Column('creator_id', sa.String(length=36), nullable=False),
    sa.ForeignKeyConstraint(['creator_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_events_id'), 'events', ['id'], unique=False)
    op.create_table('follows',
    sa.Column('follow_id', sa.String(length=36), nullable=False),
    sa.Column('follower_id', sa.String(length=36), nullable=False),
    sa.Column('following_id', sa.String(length=36), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['following_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('follow_id')
    )
    op.create_index(op.f('ix_follows_follow_id'), 'follows', ['follow_id'], unique=False)
    op.create_table('forum_threads',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('forum_id', sa.String(length=36), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('content', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('created_by', sa.String(length=36), nullable=True),
    sa.ForeignKeyConstraint(['forum_id'], ['forums.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_forum_threads_id'), 'forum_threads', ['id'], unique=False)
    op.create_table('hosts',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('user_id', sa.String(length=36), nullable=False),
    sa.Column('reason', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.Column('host_since', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_hosts_id'), 'hosts', ['id'], unique=False)
    op.create_table('recommendations',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('category', sa.String(), nullable=True),
    sa.Column('address', sa.String(), nullable=True),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('country', sa.String(), nullable=True),
    sa.Column('rating', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('tags', sa.String(), nullable=True),
    sa.Column('user_id', sa.String(length=36), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_recommendations_id'), 'recommendations', ['id'], unique=False)
    op.create_table('social_media_links',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('social_media', sa.String(), nullable=True),
    sa.Column('url', sa.String(), nullable=True),
    sa.Column('user_id', sa.String(length=36), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_social_media_links_id'), 'social_media_links', ['id'], unique=False)
    op.create_table('user_languages',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('language', sa.String(), nullable=False),
    sa.Column('level', sa.String(), nullable=True),
    sa.Column('user_id', sa.String(length=36), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_languages_id'), 'user_languages', ['id'], unique=False)
    op.create_table('event_participants',
    sa.Column('event_id', sa.String(length=36), nullable=False),
    sa.Column('user_id', sa.String(length=36), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('event_id', 'user_id')
    )
    op.create_table('forum_messages',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('thread_id', sa.String(length=36), nullable=False),
    sa.Column('content', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('created_by', sa.String(length=36), nullable=True),
    sa.Column('parent_message_id', sa.String(length=36), nullable=True),
    sa.ForeignKeyConstraint(['parent_message_id'], ['forum_messages.id'], ),
    sa.ForeignKeyConstraint(['thread_id'], ['forum_threads.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_forum_messages_id'), 'forum_messages', ['id'], unique=False)
    op.create_table('host_specialties',
    sa.Column('host_id', sa.String(length=36), nullable=False),
    sa.Column('speciality_id', sa.String(length=36), nullable=False),
    sa.ForeignKeyConstraint(['host_id'], ['hosts.id'], ),
    sa.ForeignKeyConstraint(['speciality_id'], ['specialities.id'], ),
    sa.PrimaryKeyConstraint('host_id', 'speciality_id')
    )
    op.create_table('images',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.String(length=36), nullable=True),
    sa.Column('recommendation_id', sa.String(length=36), nullable=True),
    sa.ForeignKeyConstraint(['recommendation_id'], ['recommendations.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_images_id'), 'images', ['id'], unique=False)
    op.create_table('reservations',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('start_date', sa.DateTime(), nullable=False),
    sa.Column('end_date', sa.DateTime(), nullable=False),
    sa.Column('total_price', sa.Numeric(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.Column('user_id', sa.String(length=36), nullable=False),
    sa.Column('accommodation_id', sa.String(length=36), nullable=False),
    sa.ForeignKeyConstraint(['accommodation_id'], ['accommodations.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_reservations_id'), 'reservations', ['id'], unique=False)
    op.create_table('reviews',
    sa.Column('id', sa.String(length=36), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('content', sa.String(), nullable=True),
    sa.Column('rating', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('reservation_id', sa.String(length=36), nullable=True),
    sa.Column('user_id', sa.String(length=36), nullable=True),
    sa.ForeignKeyConstraint(['reservation_id'], ['reservations.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_reviews_id'), 'reviews', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_reviews_id'), table_name='reviews')
    op.drop_table('reviews')
    op.drop_index(op.f('ix_reservations_id'), table_name='reservations')
    op.drop_table('reservations')
    op.drop_index(op.f('ix_images_id'), table_name='images')
    op.drop_table('images')
    op.drop_table('host_specialties')
    op.drop_index(op.f('ix_forum_messages_id'), table_name='forum_messages')
    op.drop_table('forum_messages')
    op.drop_table('event_participants')
    op.drop_index(op.f('ix_user_languages_id'), table_name='user_languages')
    op.drop_table('user_languages')
    op.drop_index(op.f('ix_social_media_links_id'), table_name='social_media_links')
    op.drop_table('social_media_links')
    op.drop_index(op.f('ix_recommendations_id'), table_name='recommendations')
    op.drop_table('recommendations')
    op.drop_index(op.f('ix_hosts_id'), table_name='hosts')
    op.drop_table('hosts')
    op.drop_index(op.f('ix_forum_threads_id'), table_name='forum_threads')
    op.drop_table('forum_threads')
    op.drop_index(op.f('ix_follows_follow_id'), table_name='follows')
    op.drop_table('follows')
    op.drop_index(op.f('ix_events_id'), table_name='events')
    op.drop_table('events')
    op.drop_index(op.f('ix_accommodations_id'), table_name='accommodations')
    op.drop_table('accommodations')
    op.drop_index(op.f('ix_users_mail'), table_name='users')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_specialities_id'), table_name='specialities')
    op.drop_table('specialities')
    op.drop_index(op.f('ix_forums_id'), table_name='forums')
    op.drop_table('forums')
    # ### end Alembic commands ###
